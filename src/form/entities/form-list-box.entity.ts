import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FormStateItem } from './form-state-item.entity';

@Entity()
export class FormListBox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  lengthValue: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  content: string;

  @ManyToOne(() => FormStateItem, (formStateItem) => formStateItem.listBox)
  formStateItem: FormStateItem;
}
