import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { itemSchema } from './schemas/item.schema';
import { lifeFinancialSchema } from './schemas/life_financial.schema';
import { financialSchema } from './schemas/financial.schema';
import { goalsSchema } from './schemas/goals.schema';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{name: "User", schema: userSchema}]),
    MongooseModule.forFeature([{name: "Item", schema: itemSchema}]),
    MongooseModule.forFeature([{name: "LifeFinancial", schema: lifeFinancialSchema}]),
    MongooseModule.forFeature([{name: "Financial", schema: financialSchema}]),
    MongooseModule.forFeature([{name: "Goals", schema: goalsSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
