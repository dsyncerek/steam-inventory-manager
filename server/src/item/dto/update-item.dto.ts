import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @IsPositive()
  @ApiModelPropertyOptional()
  price?: number;
}
