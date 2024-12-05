import { PartialType } from "@nestjs/mapped-types";
import { CreateGoalsDTO } from "./CreateGoalsDTO";

export class UpdateGoalsDTO extends PartialType(CreateGoalsDTO){}