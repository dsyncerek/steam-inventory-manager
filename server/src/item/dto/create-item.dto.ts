import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  classId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  @ApiModelProperty()
  appId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  @ApiModelProperty()
  contextId: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  icon: string;

  @IsInt()
  @IsPositive()
  @ApiModelPropertyOptional()
  price?: number;
}
