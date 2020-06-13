import { IsString, Length, IsIn, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// sign in only with username and password

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