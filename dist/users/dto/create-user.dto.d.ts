import { Sector } from './../user.role.enum';
import { UserRole } from '../user.role.enum';
export declare class CreateUserDto {
    username: string;
    password: string;
    role: UserRole;
    sector: Sector;
    salt: string;
}
