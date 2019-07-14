import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateBotDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  steamId: string;

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

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  ownerSteamId: string;
}
