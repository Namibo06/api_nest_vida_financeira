import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(nickname: string, email: string, password: string) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
}
