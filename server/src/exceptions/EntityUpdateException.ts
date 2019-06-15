import BaseException from './BaseException';

class EntityUpdateException extends BaseException {
  public type = "bot_update_exception";
}

export default EntityUpdateException;
