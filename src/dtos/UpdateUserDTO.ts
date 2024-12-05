import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./createUserDTO";

export class UpdateUserDTO extends PartialType(CreateUserDTO){}