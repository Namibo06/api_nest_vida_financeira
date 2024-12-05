
import { CreateGoalsDTO } from "src/dtos/goals/CreateGoalsDTO";
import { UpdateGoalsDTO } from "src/dtos/goals/UpdateGoalsDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { Goals } from "src/schemas/goals.schema";

export interface GoalsInterface{
    create(data: CreateGoalsDTO): Promise<MessageStatusDTO>;
    getAll(): Promise<Goals[]>;
    getOne(id: string): Promise<Goals>;
    update(id: string, data: UpdateGoalsDTO): Promise<MessageStatusDTO>;
    delete(id: string):Promise<MessageStatusDTO>;
    existsById(id: string): Promise<Boolean>;
}