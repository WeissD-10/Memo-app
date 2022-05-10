import { IsDateString, IsString } from 'class-validator';

export class CreateMemoDto {
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsString()
  text: string;
  @IsDateString()
  date: string;
}

export class MemoDto extends CreateMemoDto {
  @IsString()
  id: string;
}
