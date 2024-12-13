import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "src/dtos/user/CreateUserDTO";
import { LoginRequestDTO } from "src/dtos/user/LoginRequestDTO";
import { LoginResponseDTO } from "src/dtos/user/LoginResponseDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { UpdateUserDTO } from "src/dtos/user/UpdateUserDTO";
import { AuthGuard } from "src/middlewares/AuthGuard";
import { User } from "src/schemas/user.schema";
import { UserUseCase } from "src/use_cases/UserUseCase";

@Controller('users')
export class UserController{
    constructor(
        private readonly useCase: UserUseCase
    ){}

    @Post('login')
    async Login(@Body() data: LoginRequestDTO): Promise<LoginResponseDTO | MessageStatusDTO>{
        try {
            return await this.useCase.loginUseCase(data);
        } catch (error) {
            return {
                message: error.getMessage,
                status: error.getStatusCode,
                token: null
            };
        }
    }

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

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
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
    
    @UseGuards(AuthGuard)
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