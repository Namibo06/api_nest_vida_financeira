
export class LoginResponseDTO{
    message: string;
    status: number;
    token: null | string;
    userId: string;

    constructor(message: string, status: number, token: null | string, userId: string) {
        this.message = message;
        this.status = status;
        this.token = token;
        this.userId = userId;
    }
}