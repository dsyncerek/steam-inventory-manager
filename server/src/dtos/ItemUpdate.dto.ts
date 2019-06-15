import { IsInt, IsPositive } from 'class-validator';

class ItemUpdateDto {
  @IsInt()
  @IsPositive()
  price: number;
}

export default ItemUpdateDto;
