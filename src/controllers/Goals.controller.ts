import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateGoalsDTO } from "src/dtos/goals/CreateGoalsDTO";
import { UpdateGoalsDTO } from "src/dtos/goals/UpdateGoalsDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { AuthGuard } from "src/middlewares/AuthGuard";
import { Goals } from "src/schemas/goals.schema";
import { GoalsUseCase } from "src/use_cases/GoalsUseCase";

@Controller('goals')
export class GoalsController{
    constructor(
        private readonly useCase: GoalsUseCase
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createGoals(@Body() data: CreateGoalsDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createGoalslUseCase(data);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_all/:id')
    async getAllGoals(@Param('id') userId: string): Promise<Goals[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllGoalsUseCase(userId);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_one/:id')
    async getOneGoals(@Param('id') id: string): Promise<Goals | MessageStatusDTO>{
        try {
            return await this.useCase.getOneGoalsUseCase(id);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    async updateGoals(@Param('id') id: string, @Body() data: UpdateGoalsDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateGoalsUseCase(id,data);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Delete('destroy/:id')
    async deleteGoals(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteGoalsUseCase(id);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }
}