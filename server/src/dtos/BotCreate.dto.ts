import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

class BotCreateDto {
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
}

export default BotCreateDto;
