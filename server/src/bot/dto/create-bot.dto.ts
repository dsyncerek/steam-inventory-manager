import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBotDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiProperty()
  steamId: string;

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

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
  @ApiProperty()
  ownerSteamId: string;
}
