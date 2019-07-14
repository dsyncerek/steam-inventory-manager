import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  steamId: string;
}
