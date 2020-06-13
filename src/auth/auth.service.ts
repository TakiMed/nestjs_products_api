import { SignInDto } from './../users/dto/signIn-dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

    // signup function from users service--check if username already exists and
    // generate salt and hash password and store into users db collection

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  // validate password , create access token
  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.validateUserPassword(signInDto);
    const payload = {
      username: user.username,
      password: user.password,
      role: user.role,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
