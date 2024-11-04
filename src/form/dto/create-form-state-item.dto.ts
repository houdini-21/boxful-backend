import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormListBoxDto } from './create-form-list-box.dto';

export class CreateFormStateItemDto {
  @IsDateString()
  date: Date | string;

  @IsString()
  address: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  recipientAddress: string;

  @IsString()
  department: string;

  @IsString()
  municipality: string;

  @IsString()
  zone: string;

  @IsString()
  instructions: string;

  @ValidateNested({ each: true })
  @Type(() => CreateFormListBoxDto)
  @IsOptional()
  listBox?: CreateFormListBoxDto[];
}
