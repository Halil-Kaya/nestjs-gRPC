import { IsString, MaxLength, MinLength } from 'class-validator';

export class TodoCreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  content: string;
}
