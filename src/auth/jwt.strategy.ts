import { UserRole } from './../users/user.role.enum';
import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TopSecretTM967683hskfsf',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const username = payload.username;
    return await this.userService.findByUsername(username, UserRole.ADMIN);
  }
}
