import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsController } from 'src/controllers/Goals.controller';
import { GoalsRepository } from 'src/repositories/GoalsRepository';
import { goalsSchema } from 'src/schemas/goals.schema';
import { GoalsService } from 'src/services/Goals.service';
import { GoalsUseCase } from 'src/use_cases/GoalsUseCase';

@Module({
    imports: [MongooseModule.forFeature([{name: "Goals", schema: goalsSchema}]),],
    controllers: [GoalsController],
    providers: [GoalsUseCase,GoalsService,GoalsRepository]
})
export class GoalsModule {}
