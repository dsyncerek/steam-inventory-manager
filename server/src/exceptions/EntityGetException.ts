import BaseException from './BaseException';

class EntityGetException extends BaseException {
  public type = "bot_not_found_exception";
  public status = 404;
}

export default EntityGetException;
