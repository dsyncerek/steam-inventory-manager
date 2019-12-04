import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  classId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  @ApiProperty()
  appId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  @ApiProperty()
  contextId: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  icon: string;

  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  price?: number;
}
