import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialController } from 'src/controllers/Life.controller';
import { FinancialRepository } from 'src/repositories/FinancialRepository';
import { financialSchema } from 'src/schemas/financial.schema';
import { FinancialService } from 'src/services/Financial.service';
import { FinancialUseCase } from 'src/use_cases/FinancialUseCase';

@Module({
    imports: [MongooseModule.forFeature([{name: "Financial", schema: financialSchema}]),],
    controllers: [FinancialController],
    providers: [FinancialUseCase,FinancialService,FinancialRepository]
})
export class FinancialModule {}
