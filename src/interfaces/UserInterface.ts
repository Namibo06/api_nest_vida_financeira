import { CreateUserDTO } from "src/dtos/user/CreateUserDTO";
import { GetIdAndNicknameDTO } from "src/dtos/user/GetIdAndNicknameDTO";
import { LoginRequestDTO } from "src/dtos/user/LoginRequestDTO";
import { LoginResponseDTO } from "src/dtos/user/LoginResponseDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { UpdateUserDTO } from "src/dtos/user/UpdateUserDTO";
import { User } from "src/schemas/user.schema";

export interface UserInterface{
    create(data: CreateUserDTO): Promise<MessageStatusDTO>;
    getAll(): Promise<User[]>;
    getOne(id: string): Promise<User>;
    update(id: string, data: UpdateUserDTO): Promise<MessageStatusDTO>;
    delete(id: string):Promise<MessageStatusDTO>;
    login(data: LoginRequestDTO): Promise<Boolean>;
    existsById(id: string): Promise<Boolean>;
    existsByEmail(email: string): Promise<Boolean>;
    getOneByEmail(email: string): Promise<GetIdAndNicknameDTO>;
}