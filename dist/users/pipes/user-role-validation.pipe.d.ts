import { UserRole } from '../user.role.enum';
import { PipeTransform } from '@nestjs/common';
export declare class UserRoleValidationPipe implements PipeTransform {
    readonly allowRoles: UserRole[];
    transform(value: any): any;
    private isUserRoleValid;
}
