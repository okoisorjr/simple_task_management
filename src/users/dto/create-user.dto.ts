import { IsEnum, IsNotEmpty } from "class-validator";
import { Roles } from "src/Shared/rolesEnum";

export class CreateUserDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
