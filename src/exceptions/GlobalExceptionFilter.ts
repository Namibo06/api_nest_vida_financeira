import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HandleGlobalException } from 'src/utils/HandleGlobalException';
import { NotFoundException } from './NotFoundException';
import { InternalServerErrorException } from './InternalServerErrorException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let customResponse: { status: number; message: string; };

        if(exception instanceof NotFoundException){
            customResponse = HandleGlobalException.handleNotFoundException(exception);
        }else if(exception instanceof InternalServerErrorException){
            customResponse = HandleGlobalException.handleInternalServerErrorException(exception);
        }

        response.status(customResponse.status).json(customResponse);
    }
    
}