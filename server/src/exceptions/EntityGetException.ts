import BaseException from './BaseException';

class EntityGetException extends BaseException {
  public type = "entity_not_found_exception";
  public status = 404;
}

export default EntityGetException;
