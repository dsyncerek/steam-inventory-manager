import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (exception instanceof EntityNotFoundError) {
      super.catch(new NotFoundException(exception.message), host);
    } else {
      super.catch(exception, host);
    }
  }
}
