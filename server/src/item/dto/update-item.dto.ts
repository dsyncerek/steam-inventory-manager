import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @IsPositive()
  @IsDefined()
  price: number;
}
