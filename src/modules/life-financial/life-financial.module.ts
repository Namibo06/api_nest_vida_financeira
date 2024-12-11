import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LifeFinancialController } from 'src/controllers/LifeFinancial.controller';
import { LifeFinancialRepository } from 'src/repositories/LifeFinancialRepository';
import { lifeFinancialSchema } from 'src/schemas/life_financial.schema';
import { LifeFinancialService } from 'src/services/LifeFinancial.service';
import { LifeFinancialUseCase } from 'src/use_cases/LifeFinancialUseCase';

@Module({
    imports: [MongooseModule.forFeature([{name: "LifeFinancial", schema: lifeFinancialSchema}]),],
    controllers: [LifeFinancialController],
    providers: [LifeFinancialUseCase,LifeFinancialService,LifeFinancialRepository]
})
export class LifeFinancialModule {}
