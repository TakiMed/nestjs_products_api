"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_role_enum_1 = require("../user.role.enum");
const common_1 = require("@nestjs/common");
class UserRoleValidationPipe {
    constructor() {
        this.allowRoles = [user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.USER];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isUserRoleValid(value)) {
            throw new common_1.BadRequestException(`Try with admin or user`);
        }
        return value;
    }
    isUserRoleValid(role) {
        const ind = this.allowRoles.indexOf(role);
        return ind !== -1;
    }
}
exports.UserRoleValidationPipe = UserRoleValidationPipe;
//# sourceMappingURL=user-role-validation.pipe.js.map