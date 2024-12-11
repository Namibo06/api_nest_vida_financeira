import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "src/dtos/user/CreateUserDTO";
import { LoginRequestDTO } from "src/dtos/user/LoginRequestDTO";
import { LoginResponseDTO } from "src/dtos/user/LoginResponseDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { UpdateUserDTO } from "src/dtos/user/UpdateUserDTO";
import { NotFoundException } from "src/exceptions/NotFoundException";
import { UnprocessableEntityException } from "src/exceptions/UnprocessableEntityException";
import { User } from "src/schemas/user.schema";
import { UserService } from "src/services/User.service";

@Injectable()
export class UserUseCase{
    constructor(
        private readonly service: UserService
    ){}

    async createUserUseCase(data: CreateUserDTO): Promise<MessageStatusDTO>{
        console.log("passei na use case antes do if");
        if(
            data.email !== "" || data.email !== null ||
            data.nickname !== "" || data.nickname !== null ||
            data.password !== "" || data.password !== null 
        ){
            throw new UnprocessableEntityException("Campos obrigatórios vazios");
        }

        return await this.service.create(data);
    }

    async getAllUsersUseCase(): Promise<User[]>{
        return await this.service.getAll();
    }

    async getOneUserUseCase(id: string): Promise<User>{
        const existsUser = await this.service.existsById(id);
        if(!existsUser){
            throw new NotFoundException("Usuário não encontrado");
        }

        return await this.service.getOne(id);
    }

    async updateUserUseCase(id: string, data: UpdateUserDTO): Promise<MessageStatusDTO>{
        const existsUser = await this.service.existsById(id);
        if(!existsUser){
            throw new NotFoundException("Usuário não encontrado");
        }

        return await this.service.update(id,data);
    }

    async deleteUserUseCase(id: string): Promise<MessageStatusDTO>{
        const existsUser = await this.service.existsById(id);
        if(!existsUser){
            throw new NotFoundException("Usuário não encontrado");
        }

        return await this.service.delete(id);
    }

    async loginUseCase(data: LoginRequestDTO): Promise<LoginResponseDTO>{
        if(
            data.email !== "" || data.email !== null ||
            data.password !== "" || data.password !== null 
        ){
            throw new UnprocessableEntityException("Campos obrigatórios vazios");
        }

        //fazer verificação de email
        //fazer verificação de senha
        //gerar token

        return await this.service.login(data);
    }
}