import BaseException from './BaseException';

class ValidationException extends BaseException {
  public type = "validation_exception";
  public status = 400;
}

export default ValidationException;
