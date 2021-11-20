import { SignInDto } from './dto/signIn-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    private users;
    constructor(userModel: Model<User>);
    getAllUsers(user: any): Promise<User[]>;
    signUp(user: CreateUserDto): Promise<any>;
    private hashPassword;
    findByUsername(username: string, role: any): Promise<User>;
    validateUserPassword(signInDto: SignInDto): Promise<User>;
    restoreUsers(role: any): Promise<void>;
}
