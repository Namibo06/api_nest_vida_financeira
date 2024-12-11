import { CanActivate, ExecutionContext,
    Injectable} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { ForbiddenException } from "src/exceptions/ForbiddenException";
import { UnauthorizedException } from "src/exceptions/UnauthorizedException";

require('dotenv').config();

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
       const request = context.switchToHttp().getRequest();
       const token = this.extractTokenFromHeader(request);
       if(!token){
            throw new UnauthorizedException('Não Autorizado');
       }
       
       try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.SECRET_KEY_JWT
                }
            );

            request['user'] = payload;
       } catch {
            throw new ForbiddenException('Acesso Negado');
       }

       return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            return undefined;
        }
    
        const parts = authorizationHeader.split(' ');
        
        if (parts.length === 3 && parts[1] === 'Bearer') {
            const token = parts[2];
            return token;
        } else {
            return undefined;
        }
    }    
}