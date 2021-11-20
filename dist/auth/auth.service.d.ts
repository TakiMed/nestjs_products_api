import { SignInDto } from './../users/dto/signIn-dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<any>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
}
