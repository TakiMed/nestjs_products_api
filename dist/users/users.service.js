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
const user_role_enum_1 = require("./user.role.enum");
const bcrypt = require("bcryptjs");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const get_user_role_decrator_1 = require("../auth/get-user-role.decrator");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.users = [];
    }
    async getAllUsers(user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN) {
            return this.userModel.find({}, { __v: 0 });
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async signUp(user) {
        const username = user.username;
        const existing = await this.userModel.findOne({ username });
        if (existing) {
            throw new common_1.ConflictException('Username already exists');
        }
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(user.password, user.salt);
        const newUser = await this.userModel.create(user);
        await newUser.save();
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
    async findByUsername(username, role) {
        if (role === user_role_enum_1.UserRole.ADMIN) {
            return await this.userModel.findOne({ username });
        }
        else
            throw new common_1.UnauthorizedException('Error in find by Username');
    }
    async validateUserPassword(signInDto) {
        const user = await this.userModel.findOne({
            username: signInDto.username,
        });
        const passBool = await bcrypt.compare(signInDto.password, user.password);
        if (user && passBool) {
            return user;
        }
        else {
            throw new common_1.BadRequestException('Invalid signin credentials');
        }
    }
    async restoreUsers(role) {
        if (role === user_role_enum_1.UserRole.ADMIN) {
            await this.userModel.deleteMany({}, err => {
                if (err) {
                    throw new common_1.InternalServerErrorException();
                }
            });
        }
        else
            throw new common_1.UnauthorizedException();
    }
};
__decorate([
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "getAllUsers", null);
__decorate([
    __param(0, get_user_role_decrator_1.GetUserRole()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "restoreUsers", null);
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map