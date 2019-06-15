import BaseException from './BaseException';

class EntityDeleteException extends BaseException {
  public type = "entity_create_exception";
}

export default EntityDeleteException;
