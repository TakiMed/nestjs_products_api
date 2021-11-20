import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    addUser(user: CreateUserDto): Promise<any>;
    getAllUsers(user: any): Promise<User[]>;
    findByUsername(username: string, role: any): Promise<User>;
    dropCollection(role: any): Promise<void>;
}
