import BaseException from './BaseException';

class EntityDeleteException extends BaseException {
  public type = "bot_create_exception";
}

export default EntityDeleteException;
