import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  steamId: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  appId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  contextId: number;
}
