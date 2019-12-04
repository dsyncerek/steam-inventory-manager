import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateBotDto {
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @ApiPropertyOptional()
  login?: string;

  @IsString()
  @ApiPropertyOptional()
  tradeLink?: string;

  @IsBoolean()
  @ApiPropertyOptional()
  is2FA?: boolean;

  @IsBoolean()
  @ApiPropertyOptional()
  isOnline?: boolean;
}
