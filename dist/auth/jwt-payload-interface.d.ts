import { UserRole, Sector } from './../users/user.role.enum';
export interface JwtPayload {
    username: string;
    password: string;
    role: UserRole;
    sector: Sector;
}
