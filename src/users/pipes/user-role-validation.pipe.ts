import { UserRole } from '../user.role.enum';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
// this pipe is is created but not used
export class UserRoleValidationPipe implements PipeTransform {
  readonly allowRoles = [UserRole.ADMIN, UserRole.USER];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isUserRoleValid(value)) {
      throw new BadRequestException(`Try with admin or user`);
    }
    return value;
  }
  private isUserRoleValid(role: any) {
    const ind = this.allowRoles.indexOf(role);
    return ind !== -1;
  }
}
