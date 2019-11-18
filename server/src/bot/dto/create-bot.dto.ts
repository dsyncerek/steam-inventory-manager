import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBotDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiModelProperty()
  steamId: string;

  @IsString()
  @ApiModelPropertyOptional()
  name?: string;

  @IsString()
  @ApiModelPropertyOptional()
  login?: string;

  @IsString()
  @ApiModelPropertyOptional()
  tradeLink?: string;

  @IsBoolean()
  @ApiModelPropertyOptional()
  is2FA?: boolean;

  @IsBoolean()
  @ApiModelPropertyOptional()
  isOnline?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiModelProperty()
  ownerSteamId: string;
}
