import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HandleGlobalException } from 'src/utils/HandleGlobalException';
import { NotFoundException } from './NotFoundException';
import { InternalServerErrorException } from './InternalServerErrorException';
import { UnprocessableEntityException } from './UnprocessableEntityException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let customResponse: { status: number| string ; message: string; };

        if(exception instanceof NotFoundException){
            customResponse = HandleGlobalException.handleNotFoundException(exception);
        }else if(exception instanceof InternalServerErrorException){
            customResponse = HandleGlobalException.handleInternalServerErrorException(exception);
        }else if(exception instanceof UnprocessableEntityException){
            customResponse = HandleGlobalException.handleUnprocessableEntityException(exception);
        }

        response.status(customResponse.status).json(customResponse);
    }
    
}