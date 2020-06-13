import { User } from './../users/users.model';
import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

// get user custom decorator
export const GetUser = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<any> => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) {
      throw new BadRequestException('Error getting user');
    }
    return await req.user;
  },
);
