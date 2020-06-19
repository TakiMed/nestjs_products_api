import { GetUser } from 'src/auth/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUserRole } from 'src/auth/get-user-role.decrator';

@ApiTags('Users')
@Controller('users')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 409, description: 'User already exists.' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @ApiCreatedResponse({ description: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  async addUser(@Body() user: CreateUserDto): Promise<any> {
    return await this.userService.signUp(user);
  }
  // do not use this function, users already added
  /*
  @Post('/migrate')
  async migrate(){
    return await this.userService.manualMigrations();
  }
  */
  @Get('/all')
  async getAllUsers(@GetUser() user): Promise<User[]> {
    console.log(user);
    return this.userService.getAllUsers(user);
  }

  @Get(':username')
  async findByUsername(
    @Param('username') username: string,
    @GetUserRole() role,
  ): Promise<User> {
    return this.userService.findByUsername(username, role);
  }

  @Delete()
  async dropCollection(@GetUserRole() role): Promise<void> {
    return this.userService.restoreUsers(role);
  }
}
