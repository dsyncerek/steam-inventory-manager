import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, Matches } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiProperty()
  botSteamId: string;

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
}
