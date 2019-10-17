import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, Matches } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  botSteamId: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  appId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  contextId: number;
}
