"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator(async (data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) {
        throw new common_1.BadRequestException('Error getting user');
    }
    return await req.user;
});
//# sourceMappingURL=get-user.decorator.js.map