import { UserRole } from './../users/user.role.enum';
import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

// get only role --only admins can delete

export const GetUserRole = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<UserRole> => {
    const req = ctx.switchToHttp().getRequest();
    try {
      return await req.user.role;
    } catch (err) {
      throw new BadRequestException('ERROR IN ROLE DECORATOR');
    }
  },
);
