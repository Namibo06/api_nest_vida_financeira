import { CreateUserDTO } from "src/dtos/createUserDTO";
import { LoginRequestDTO } from "src/dtos/LoginRequestDTO";
import { LoginResponseDTO } from "src/dtos/LoginResponseDTO";
import { MessageStatusDTO } from "src/dtos/MessageStatusDTO";
import { UpdateUserDTO } from "src/dtos/UpdateUserDTO";
import { User } from "src/schemas/user.schema";

export interface UserInterface{
    create(data: CreateUserDTO): Promise<MessageStatusDTO>;
    getAll(): Promise<User[]>;
    getOne(id: string): Promise<User>;
    update(id: string, data: UpdateUserDTO): Promise<MessageStatusDTO>;
    delete(id: string):Promise<MessageStatusDTO>;
    login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
    existsById(id: string): Promise<Boolean>;
    existsByEmail(email: string): Promise<Boolean>;
}