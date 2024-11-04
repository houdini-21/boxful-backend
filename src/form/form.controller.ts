import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormStateItemDto } from './dto/create-form-state-item.dto';

@Controller('form-state-item')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() createFormStateItemDto: CreateFormStateItemDto) {
    return this.formService.create(createFormStateItemDto);
  }

  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormStateItemDto: CreateFormStateItemDto,
  ) {
    return this.formService.update(+id, updateFormStateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
