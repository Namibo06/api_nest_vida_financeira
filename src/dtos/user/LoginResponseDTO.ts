
export class LoginResponseDTO{
    message: string;
    status: number;
    token: null | string;

    constructor(message: string, status: number, token: null | string) {
        this.message = message;
        this.status = status;
        this.token = token;
    }
}