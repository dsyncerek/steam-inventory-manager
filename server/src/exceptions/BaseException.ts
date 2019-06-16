class BaseException extends Error {
  public message: string;
  public status: number;
  public type = 'error';

  constructor(message = 'something went wrong', status = 500) {
    super(message);

    this.message = message;
    this.status = status;
  }
}

export default BaseException;
