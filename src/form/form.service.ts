import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFormStateItemDto } from './dto/create-form-state-item.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}

  async create(createFormStateItemDto: CreateFormStateItemDto) {
    return this.prisma.formStateItem.create({
      data: {
        ...createFormStateItemDto,
        listBox: {
          create: createFormStateItemDto.listBox,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.formStateItem.findMany({
      include: { listBox: true },
    });
  }

  async findOne(id: number) {
    const formStateItem = await this.prisma.formStateItem.findUnique({
      where: { id },
      include: { listBox: true },
    });
    if (!formStateItem)
      throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
    return formStateItem;
  }

  async update(id: number, updateFormStateItemDto: CreateFormStateItemDto) {
    const existingFormStateItem = await this.prisma.formStateItem.findUnique({
      where: { id },
    });

    if (!existingFormStateItem) {
      throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
    }

    const { listBox, ...formStateData } = updateFormStateItemDto;

    const updatedListBoxes = listBox.map((box) => {
      if (box.id) {
        return this.prisma.formListBox.update({
          where: { id: box.id },
          data: {
            weight: box.weight,
            lengthValue: box.lengthValue,
            height: box.height,
            width: box.width,
            content: box.content,
          },
        });
      } else {
        return this.prisma.formListBox.create({
          data: {
            weight: box.weight,
            lengthValue: box.lengthValue,
            height: box.height,
            width: box.width,
            content: box.content,
            formStateItemId: id,
          },
        });
      }
    });

    await this.prisma.$transaction(updatedListBoxes);

    return this.prisma.formStateItem.update({
      where: { id },
      data: {
        ...formStateData,
      },
      include: {
        listBox: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.formStateItem.delete({ where: { id } });
    return 'Elemento eliminado';
  }
}
