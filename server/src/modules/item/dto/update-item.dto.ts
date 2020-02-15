import { IsInt, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @IsPositive()
  price?: number;
}
