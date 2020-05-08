import {
  ArgumentsHost,
  Catch,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    if (exception instanceof EntityNotFoundError) {
      super.catch(new NotFoundException(exception.message), host);
    } else if (exception instanceof QueryFailedError) {
      super.catch(new ConflictException(exception.message), host);
    } else if (exception instanceof HttpException) {
      super.catch(exception, host);
    } else {
      super.catch(new InternalServerErrorException(exception.message), host);
    }
  }
}
