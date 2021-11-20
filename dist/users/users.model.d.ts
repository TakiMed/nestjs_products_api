import { UserRole, Sector } from './user.role.enum';
import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export declare class User extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
    role: UserRole;
    salt: string;
    sector: Sector;
}
