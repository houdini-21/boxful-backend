import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FormListBox } from './form-list-box.entity';

@Entity()
export class FormStateItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  address: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  recipientAddress: string;

  @Column()
  department: string;

  @Column()
  municipality: string;

  @Column()
  zone: string;

  @Column()
  instructions: string;

  @OneToMany(() => FormListBox, (formListBox) => formListBox.formStateItem, {
    cascade: true,
  })
  listBox: FormListBox[];
}
