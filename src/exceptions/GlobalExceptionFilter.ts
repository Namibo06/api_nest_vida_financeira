import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HandleGlobalException } from 'src/utils/HandleGlobalException';
import { NotFoundException } from './NotFoundException';
import { InternalServerErrorException } from './InternalServerErrorException';
import { UnprocessableEntityException } from './UnprocessableEntityException';
import { UnauthorizedException } from './UnauthorizedException';
import { ForbiddenException } from './ForbiddenException';
import { ConflictException } from './ConflictException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let customResponse: { status: number | string; message: string };

    if (exception instanceof NotFoundException) {
      customResponse = HandleGlobalException.handleNotFoundException(exception);
    } else if (exception instanceof InternalServerErrorException) {
      customResponse = HandleGlobalException.handleInternalServerErrorException(exception);
    } else if (exception instanceof UnprocessableEntityException) {
      customResponse = HandleGlobalException.handleUnprocessableEntityException(exception);
    } else if(exception instanceof UnauthorizedException){
      customResponse = HandleGlobalException.handleUnauthorizedException(exception);
    } else if(exception instanceof ForbiddenException){
      customResponse = HandleGlobalException.handleForbbidenException(exception);
    } else if(exception instanceof ConflictException){
      customResponse = HandleGlobalException.handleConflictException(exception);
    } else {
      customResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro inesperado',
      };
    }

    response.status(Number(customResponse.status)).json(customResponse);
  }
}
