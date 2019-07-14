export function getSteamIdFromIdentifier(identifier: string): string {
  const identifierRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;
  return identifierRegex.exec(identifier)[1];
}
