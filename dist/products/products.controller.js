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
const sales_service_1 = require("./../sales/sales.service");
const sell_and_buy_dto_1 = require("./dto/sell-and-buy-dto");
const passport_1 = require("@nestjs/passport");
const create_product_dto_1 = require("./dto/create-product.dto");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const product_models_1 = require("./product.models");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const get_user_role_decrator_1 = require("../auth/get-user-role.decrator");
const find_prod_dto_1 = require("./dto/find-prod-dto");
let ProductsController = class ProductsController {
    constructor(productsService, salesService) {
        this.productsService = productsService;
        this.salesService = salesService;
    }
    async addProduct(product, user) {
        return await this.productsService.insertProduct(product, user._id);
    }
    async migrate() {
        return await this.productsService.manualMigrations();
    }
    async getAmount() {
        return this.productsService.myStock();
    }
    async getProducts(user, filterDto) {
        if (Object.keys(filterDto).length) {
            return await this.productsService.getProductsWithFilter(user, filterDto);
        }
        else {
            return await this.productsService.getProducts(user);
        }
    }
    async getProduct(prodId, user) {
        const product = await this.productsService.getSingleProduct(prodId, user);
        return product;
    }
    async updateProduct(prodId, changes, user) {
        const result = await this.productsService.updateProduct(prodId, changes, user);
        return result;
    }
    async sell(prodId, newQuan, user) {
        const res = await this.productsService.sell(prodId, newQuan, user);
        return res;
    }
    async buy(prodId, newQuan) {
        const res = await this.productsService.buy(prodId, newQuan);
        return res;
    }
    async removeProduct(prodId, role) {
        return await this.productsService.deleteProduct(prodId, role);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiBody({ type: create_product_dto_1.CreateProductDto }),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    common_1.Post('/migrations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "migrate", null);
__decorate([
    common_1.Get('stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAmount", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiQuery({ name: 'search', required: false, type: String }),
    swagger_1.ApiQuery({ name: 'quantity', required: false, type: Number }),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_prod_dto_1.FindProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiBody({ type: create_product_dto_1.CreateProductDto }),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_models_1.Product, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    common_1.Patch('sell/:id'),
    swagger_1.ApiBody({ type: sell_and_buy_dto_1.SellOrBuyDTO }),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('quantity')),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "sell", null);
__decorate([
    common_1.Patch('buy/:id'),
    swagger_1.ApiBody({ type: sell_and_buy_dto_1.SellOrBuyDTO }),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "buy", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __param(1, get_user_role_decrator_1.GetUserRole()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "removeProduct", null);
ProductsController = __decorate([
    swagger_1.ApiTags('Products'),
    common_1.Controller('products'),
    swagger_1.ApiResponse({ status: 200, description: 'Success' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not Found.' }),
    swagger_1.ApiResponse({ status: 409, description: 'User already exists.' }),
    swagger_1.ApiResponse({ status: 500, description: 'Internal Server Error' }),
    common_1.UseGuards(passport_1.AuthGuard()),
    swagger_1.ApiBearerAuth('jwt'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        sales_service_1.SalesService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map