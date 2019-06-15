import BaseException from './BaseException';

class SteamException extends BaseException {
  public type = "steam_exception";
}

export default SteamException;
