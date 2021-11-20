"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GetUserRole = common_1.createParamDecorator(async (data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    try {
        return await req.user.role;
    }
    catch (err) {
        throw new common_1.BadRequestException('ERROR IN ROLE DECORATOR');
    }
});
//# sourceMappingURL=get-user-role.decrator.js.map