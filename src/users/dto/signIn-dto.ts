import { UsersService } from './../users.service';
import { Sector } from './../user.role.enum';
import { UserRole } from '../user.role.enum';
import { IsString, Length, IsIn, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @Length(5, 15)
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @Length(8, 20)
  @Matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-])/, {
    message: 'Password is too weak',
  })
  @ApiProperty({ type: String, description: 'password' })
  password: string;

}