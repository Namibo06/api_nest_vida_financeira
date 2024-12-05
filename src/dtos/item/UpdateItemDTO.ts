import { PartialType } from "@nestjs/mapped-types";
import { CreateItemDTO } from "./CreateItemDTO";

export class UpdateItemDTO extends PartialType(CreateItemDTO){}