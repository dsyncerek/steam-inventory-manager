import { NextFunction, Request, Response } from 'express';
import BaseException from '../exceptions/BaseException';

function errorMiddleware(error: BaseException, request: Request, response: Response, next: NextFunction) {
  const { message, status, type } = error;

  response
    .status(status)
    .send({
      type,
      message,
      status,
    });
}

export default errorMiddleware;
