import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormStateItem } from './entities/form-state-item.entity';
import { FormListBox } from './entities/form-list-box.entity';
import { CreateFormStateItemDto } from './dto/create-form-state-item.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormStateItem)
    private formStateItemRepository: Repository<FormStateItem>,
    @InjectRepository(FormListBox)
    private formListBoxRepository: Repository<FormListBox>,
  ) {}

  create(
    createFormStateItemDto: CreateFormStateItemDto,
  ): Promise<FormStateItem> {
    const formStateItem = this.formStateItemRepository.create(
      createFormStateItemDto,
    );
    return this.formStateItemRepository.save(formStateItem);
  }

  findAll(): Promise<FormStateItem[]> {
    return this.formStateItemRepository.find({ relations: ['listBox'] });
  }

  findOne(id: number): Promise<FormStateItem> {
    return this.formStateItemRepository.findOne({
      where: { id },
      relations: ['listBox'],
    });
  }

  async update(
    id: number,
    updateFormStateItemDto: CreateFormStateItemDto,
  ): Promise<FormStateItem> {
    const formStateItem = await this.formStateItemRepository.findOne({
      where: { id },
      relations: ['listBox'],
    });
    if (!formStateItem) {
      throw new NotFoundException(`FormStateItem con ID ${id} no encontrado`);
    }

    formStateItem.address =
      updateFormStateItemDto.address || formStateItem.address;
    formStateItem.instructions =
      updateFormStateItemDto.instructions || formStateItem.instructions;

    if (updateFormStateItemDto.listBox) {
      const existingListBoxIds = formStateItem.listBox.map((box) => box.id);

      const updatedListBoxes = await Promise.all(
        updateFormStateItemDto.listBox.map(async (box) => {
          if (box.id && existingListBoxIds.includes(box.id)) {
            await this.formListBoxRepository.update(box.id, box);
            return this.formListBoxRepository.findOne({
              where: { id: box.id },
            });
          } else {
            const newListBox = this.formListBoxRepository.create({
              ...box,
              formStateItem,
            });
            return this.formListBoxRepository.save(newListBox);
          }
        }),
      );

      formStateItem.listBox = updatedListBoxes;
    }

    return this.formStateItemRepository.save(formStateItem);
  }

  remove(id: number): Promise<void> {
    return this.formStateItemRepository.delete(id).then(() => undefined);
  }
}
