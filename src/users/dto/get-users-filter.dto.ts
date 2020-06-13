import { UserRole } from '../user.role.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class GetUsersFilterDto {
  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.USER])
  role: UserRole;

  @IsOptional()
  @IsNotEmpty()
  searchTerm: string;
}
