import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormStateItem } from './entities/form-state-item.entity';
import { FormListBox } from './entities/form-list-box.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormStateItem, FormListBox])],
  providers: [FormService],
  controllers: [FormController],
})
export class FormModule {}
