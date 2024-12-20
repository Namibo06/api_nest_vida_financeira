import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { LifeFinancialModule } from './modules/life-financial/life-financial.module';
import { FinancialModule } from './modules/financial/financial.module';
import { ItemModule } from './modules/item/item.module';
import { GoalsModule } from './modules/goals/goals.module';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {expiresIn: '24h'}
    }),
    UserModule,
    LifeFinancialModule,
    FinancialModule,
    ItemModule,
    GoalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
