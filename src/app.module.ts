import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ItemSchema } from './schemas/item.schema';
import { LifeFinancialSchema } from './schemas/life_financial.schema';
import { FinancialSchema } from './schemas/financial.schema';
import { GoalsSchema } from './schemas/goals.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:financas_tech'),
    MongooseModule.forFeature([{name: "UserSchema", schema: UserSchema}]),
    MongooseModule.forFeature([{name: "ItemSchema", schema: ItemSchema}]),
    MongooseModule.forFeature([{name: "LifeFinancialSchema", schema: LifeFinancialSchema}]),
    MongooseModule.forFeature([{name: "FinancialSchema", schema: FinancialSchema}]),
    MongooseModule.forFeature([{name: "GoalsSchema", schema: GoalsSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
