import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/User.controller';
import { UserRepository } from 'src/repositories/UserRepository';
import { userSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/User.service';
import { UserUseCase } from 'src/use_cases/UserUseCase';

@Module({
    imports: [ 
        MongooseModule.forFeature([{name: "User", schema: userSchema}]),
    ],
    controllers:[UserController],
    providers: [UserUseCase,UserService,UserRepository]
})
export class UserModule {}
