import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { Item, itemSchema } from './schemas/item.schema';
import { LifeFinancial, lifeFinancialSchema } from './schemas/life_financial.schema';
import { Financial, financialSchema } from './schemas/financial.schema';
import { Goals, goalsSchema } from './schemas/goals.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/financas_tech'),
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
