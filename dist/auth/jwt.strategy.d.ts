import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { JwtPayload } from './jwt-payload-interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UsersService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
