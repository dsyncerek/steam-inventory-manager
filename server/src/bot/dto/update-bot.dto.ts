import { IsBoolean, IsString } from 'class-validator';

export class UpdateBotDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  tradeLink: string;

  @IsBoolean()
  is2FA: boolean;

  @IsBoolean()
  isOnline: boolean;
}
