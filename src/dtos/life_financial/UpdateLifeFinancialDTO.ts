import { PartialType } from "@nestjs/mapped-types";
import { CreateLifeFinancialDTO } from "./CreateLifeFinancialDTO";

export class UpdateLifeFinancialDTO extends PartialType(CreateLifeFinancialDTO){}