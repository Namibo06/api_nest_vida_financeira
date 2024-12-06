import { HttpStatus } from "@nestjs/common";
import { InternalServerErrorException } from "src/exceptions/InternalServerErrorException";
import { NotFoundException } from "src/exceptions/NotFoundException";
import { UnprocessableEntityException } from "src/exceptions/UnprocessableEntityException";

export class HandleGlobalException{
    static handleNotFoundException(exception: NotFoundException){
        return {
            message: exception.message,
            status: HttpStatus.NOT_FOUND
        };
    }

    static handleInternalServerErrorException(exception: InternalServerErrorException){
        return {
            message: exception.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR
        };
    }

    static handleUnprocessableEntityException(exception: UnprocessableEntityException){
        return {
            message: exception.message,
            status: HttpStatus.UNPROCESSABLE_ENTITY
        };
    }
}