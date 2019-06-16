import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import ValidationException from '../exceptions/ValidationException';

function validationMiddleware<T>(type: any): RequestHandler {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body = await transformAndValidate(type, request.body, {
        validator: {
          skipMissingProperties: true,
          whitelist: true,
        },
      });

      next();
    } catch (errors) {
      const message = errors.map(error => Object.values(error.constraints).join(', ')).join(', ');
      next(new ValidationException(message));
    }
  };
}

export default validationMiddleware;
