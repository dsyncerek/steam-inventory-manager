import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, Matches } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiModelProperty()
  botSteamId: string;

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
}
