export interface CreateBotDto {
  steamId: string;
  ownerSteamId: string;
  name?: string;
  login?: string;
  tradeLink?: string;
  is2FA?: boolean;
  isOnline?: boolean;
}
