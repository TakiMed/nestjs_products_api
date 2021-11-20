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
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const product_models_1 = require("../products/product.models");
let SalesService = class SalesService {
    constructor(saleModel, productModel) {
        this.saleModel = saleModel;
        this.productModel = productModel;
        this.products = [];
    }
    async insertSale(prodId, quantity, user) {
        const newSale = await this.saleModel.create({});
        const prod = await this.productModel.findById(prodId);
        newSale.productId = prodId;
        newSale.price = prod.price;
        newSale.quantity = quantity;
        newSale.sector = user.sector;
        newSale.date = new Date();
        newSale.save();
    }
    async getAllSales(user) {
        if (user.sector === 'MAN') {
            return await this.saleModel.find({});
        }
        else
            throw new common_1.BadRequestException('Restricted rights');
    }
    async getDailySales(user) {
        const sales = await this.getAllSales(user);
        const today = new Date().getTime();
        const yesterday = new Date(today - 86400000);
        const filtered = sales.filter(sale => sale.date > yesterday);
        return filtered;
    }
    async sellProducts() {
        const prods = await this.productModel.find({});
        prods.forEach((prod) => this.insertSale(prod._id, 5, { sector: prod.sector }));
        return 'PRODUCTS SOLD';
    }
};
SalesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Sale')),
    __param(1, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SalesService);
exports.SalesService = SalesService;
//# sourceMappingURL=sales.service.js.map