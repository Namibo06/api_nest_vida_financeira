import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { CreateGoalsDTO } from "src/dtos/goals/CreateGoalsDTO";
import { UpdateGoalsDTO } from "src/dtos/goals/UpdateGoalsDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { Financial } from "src/schemas/financial.schema";
import { Goals } from "src/schemas/goals.schema";
import { FinancialUseCase } from "src/use_cases/FinancialUseCase";
import { GoalsUseCase } from "src/use_cases/GoalsUseCase";

@Controller('goals')
export class GoalsController{
    constructor(
        private readonly useCase: GoalsUseCase
    ){}

    @Post('create')
    async createGoals(@Body() data: CreateGoalsDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createGoalslUseCase(data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Get('get_all')
    async getAllGoals(): Promise<Goals[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllGoalsUseCase();
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Get('get_one/:id')
    async getOneGoals(@Param('id') id: string): Promise<Goals | MessageStatusDTO>{
        try {
            return await this.useCase.getOneGoalsUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Patch('update/:id')
    async updateGoals(@Param('id') id: string, @Body() data: UpdateGoalsDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateGoalsUseCase(id,data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Delete('destroy/:id')
    async deleteGoals(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteGoalsUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }
}