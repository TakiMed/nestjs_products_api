import { SignInDto } from './../users/dto/signIn-dto';
import { UsersService } from './../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signUp(createUserDto: CreateUserDto): Promise<void>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    test(): Promise<void>;
}
