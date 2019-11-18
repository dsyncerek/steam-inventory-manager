import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiModelProperty()
  steamId: string;
}
