import { IsNumber, IsString } from 'class-validator';

export class CreateFormListBoxDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  lengthValue: number;

  @IsNumber()
  height: number;

  @IsNumber()
  width: number;

  @IsString()
  content: string;
}
