import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  price?: number;
}
