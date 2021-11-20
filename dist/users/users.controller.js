"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_user_decorator_1 = require("../auth/get-user.decorator");
const create_user_dto_1 = require("./dto/create-user.dto");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_role_decrator_1 = require("../auth/get-user-role.decrator");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async addUser(user) {
        return await this.userService.signUp(user);
    }
    async getAllUsers(user) {
        console.log(user);
        return this.userService.getAllUsers(user);
    }
    async findByUsername(username, role) {
        return this.userService.findByUsername(username, role);
    }
    async dropCollection(role) {
        return this.userService.restoreUsers(role);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiCreatedResponse({ description: 'User registration' }),
    swagger_1.ApiBody({ type: create_user_dto_1.CreateUserDto }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    common_1.Get('/all'),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get(':username'),
    __param(0, common_1.Param('username')),
    __param(1, get_user_role_decrator_1.GetUserRole()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByUsername", null);
__decorate([
    common_1.Delete(),
    __param(0, get_user_role_decrator_1.GetUserRole()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "dropCollection", null);
UsersController = __decorate([
    swagger_1.ApiTags('Users'),
    common_1.Controller('users'),
    swagger_1.ApiResponse({ status: 200, description: 'Success' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not Found.' }),
    swagger_1.ApiResponse({ status: 409, description: 'User already exists.' }),
    swagger_1.ApiResponse({ status: 500, description: 'Internal Server Error' }),
    common_1.UseGuards(passport_1.AuthGuard()),
    swagger_1.ApiBearerAuth('jwt'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map