import BaseException from './BaseException';

class EntityCreateException extends BaseException {
  public type = "bot_create_exception";
}

export default EntityCreateException;
