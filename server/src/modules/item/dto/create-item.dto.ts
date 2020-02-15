import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  classId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  appId: number;

  @IsInt()
  @IsPositive()
  @IsDefined()
  contextId: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  icon: string;

  @IsInt()
  @IsPositive()
  price?: number;
}
