import BaseException from './BaseException';

class EntityUpdateException extends BaseException {
  public type = "entity_update_exception";
}

export default EntityUpdateException;
