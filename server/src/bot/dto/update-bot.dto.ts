import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateBotDto {
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
}
