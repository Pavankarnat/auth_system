import { IsEmail, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsUUID()
  organizationId: string;
}