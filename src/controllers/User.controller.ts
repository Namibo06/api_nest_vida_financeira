import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/dtos/user/CreateUserDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { UpdateUserDTO } from "src/dtos/user/UpdateUserDTO";
import { User } from "src/schemas/user.schema";
import { UserUseCase } from "src/use_cases/UserUseCase";

@Controller('users')
export class UserController{
    constructor(
        private readonly useCase: UserUseCase
    ){}

    @Post('create')
    async createUser(@Body() data: CreateUserDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createUserUseCase(data);
        } catch (error) {
            return {
                message: error.getMessage,
                status: error.getStatusCode
            };
        }
    }

    @Get('get_all')
    async getAllUsers(): Promise<User[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllUsersUseCase();
        } catch (error) {
            return {
                message: error.getMessage,
                status: error.getStatusCode
            };
        }
    }

    @Get('get_one/:id')
    async getOneUser(@Param('id') id: string): Promise<User | MessageStatusDTO>{
        try {
            return await this.useCase.getOneUserUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage,
                status: error.getStatusCode
            };
        }
    }

    @Patch('update/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateUserUseCase(id,data);
        } catch (error) {
            return {
                message: error.getMessage,
                status: error.getStatusCode
            };
        }
    }

    @Delete('destroy/:id')
    async deleteUser(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteUserUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage,
                status: error.getStatusCode
            };
        }
    }
}