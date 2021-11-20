"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sales_module_1 = require("./../sales/sales.module");
const sale_model_1 = require("./../sales/sale.model");
const sales_service_1 = require("./../sales/sales.service");
const users_module_1 = require("./../users/users.module");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("./../auth/auth.module");
const users_model_1 = require("../users/users.model");
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const mongoose_1 = require("@nestjs/mongoose");
const product_models_1 = require("./product.models");
let ProductsModule = ProductsModule_1 = class ProductsModule {
};
ProductsModule = ProductsModule_1 = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Product', schema: product_models_1.ProductSchema },
                { name: 'User', schema: users_model_1.UserSchema },
                { name: 'Sale', schema: sale_model_1.SaleSchema }
            ]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            common_1.forwardRef(() => sales_module_1.SalesModule)
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [
            sales_service_1.SalesService,
            products_service_1.ProductsService
        ],
        exports: [ProductsModule_1]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map