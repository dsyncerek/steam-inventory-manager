import BaseException from './BaseException';

class EntityCreateException extends BaseException {
  public type = 'entity_create_exception';
}

export default EntityCreateException;
