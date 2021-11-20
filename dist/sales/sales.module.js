"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_models_1 = require("./../products/product.models");
const users_module_1 = require("./../users/users.module");
const auth_module_1 = require("./../auth/auth.module");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const sale_model_1 = require("./sale.model");
const products_module_1 = require("../products/products.module");
const sales_controller_1 = require("./sales.controller");
let SalesModule = class SalesModule {
};
SalesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Sale', schema: sale_model_1.SaleSchema },
                { name: 'Product', schema: product_models_1.ProductSchema }
            ]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            common_1.forwardRef(() => products_module_1.ProductsModule)
        ],
        providers: [sales_service_1.SalesService],
        exports: [sales_service_1.SalesService],
        controllers: [sales_controller_1.SalesController]
    })
], SalesModule);
exports.SalesModule = SalesModule;
//# sourceMappingURL=sales.module.js.map