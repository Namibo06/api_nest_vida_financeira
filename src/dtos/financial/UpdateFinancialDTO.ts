import { PartialType } from "@nestjs/mapped-types";
import { CreateFinancialDTO } from "./CreateFinancialDTO";

export class UpdateFinancialDTO extends PartialType(CreateFinancialDTO){}