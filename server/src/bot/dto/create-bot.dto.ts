import { IsBoolean, IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBotDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^\d{17}$/)
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
  @Matches(/^\d{17}$/)
  ownerSteamId: string;
}
