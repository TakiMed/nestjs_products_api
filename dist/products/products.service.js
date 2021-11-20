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
const add_products_1 = require("./add.products");
const sales_service_1 = require("./../sales/sales.service");
const find_prod_dto_1 = require("./dto/find-prod-dto");
const mailer_1 = require("./../mailer");
const user_role_enum_1 = require("./../users/user.role.enum");
const schedule_1 = require("@nestjs/schedule");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_models_1 = require("./product.models");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const get_user_role_decrator_1 = require("../auth/get-user-role.decrator");
const fs = require("fs");
const json2csv = require("json2csv");
let ProductsService = class ProductsService {
    constructor(productModel, userModel, salesService) {
        this.productModel = productModel;
        this.userModel = userModel;
        this.salesService = salesService;
        this.products = [];
    }
    async insertProduct(product, user) {
        const existing = await this.productModel.findOne({ title: product.title });
        if (existing) {
            throw new common_1.BadRequestException('Product already exists');
        }
        else {
            const newProd = await this.productModel.create(product);
            newProd.creator = user._id;
            newProd.sector = user.sector;
            await newProd.save();
            return newProd;
        }
    }
    async manualMigrations() {
        await this.productModel.insertMany(add_products_1.PRODUCTS);
        return 'PRODUCTS ADDED';
    }
    async getProducts(user) {
        const sector = user.sector;
        const role = user.role;
        const data = role === user_role_enum_1.UserRole.USER
            ? await this.productModel.find({ sector }, { __v: 0 }).exec()
            : await this.productModel.find({}, { __v: 0 }).exec();
        return data;
    }
    async getProductsWithFilter(user, filterDto) {
        const { search, quantity } = filterDto;
        const products = await this.getProducts(user);
        let filtered;
        if (search) {
            filtered = await products.filter(prod => prod.title.includes(search) || prod.description.includes(search));
        }
        if (quantity) {
            filtered = await products.filter(prod => prod.quantity > quantity);
        }
        return filtered;
    }
    async getSingleProduct(prodId, user) {
        const sector = user.sector;
        const role = user.role;
        const res = role === user_role_enum_1.UserRole.USER
            ? await this.productModel.find({ _id: prodId, sector })
            : await this.productModel.findOne({ _id: prodId });
        if (!res)
            throw new common_1.NotFoundException('No such product here');
        return res;
    }
    async updateProduct(prodId, changes, user) {
        const sector = user.sector;
        const role = user.role;
        const updatedProduct = role === user_role_enum_1.UserRole.USER
            ? await this.productModel.findOneAndUpdate({ _id: prodId, sector }, changes, { new: true })
            : await this.productModel.findByIdAndUpdate(prodId, changes, {
                new: true,
            });
        if (!updatedProduct)
            throw new common_1.BadRequestException('Product not found');
        return updatedProduct;
    }
    async deleteProduct(prodId, role) {
        if (role === user_role_enum_1.UserRole.ADMIN) {
            try {
                if (prodId === 'all') {
                    await this.productModel.deleteMany({});
                    return `You've cleared the collection`;
                }
                await this.productModel.deleteOne({ _id: prodId }).exec();
                return `Product with id ${prodId} deleted`;
            }
            catch (error) {
                throw new common_1.NotFoundException('No such a product here');
            }
        }
        else {
            throw new common_1.UnauthorizedException('Restricted rights');
        }
    }
    async sell(prodId, quant, user) {
        const prod = await this.productModel.findOne({ _id: prodId });
        if (prod.sector === user.sector || user.role === 'ADMIN') {
            const newQuan = prod.quantity - quant;
            if (newQuan >= 0) {
                await prod.updateOne({ quantity: newQuan }, { new: true });
                prod.save();
                const sale = await this.salesService.insertSale(prod._id, quant, user);
                return this.productModel.findOne({ _id: prodId });
            }
            else {
                throw new common_1.BadRequestException('You exceeded quantity in stock');
            }
        }
        else {
            throw new common_1.BadRequestException('Unauthorized request');
        }
    }
    async buy(prodId, quant) {
        const prod = await this.productModel.findOne({ _id: prodId });
        const newQuan = prod.quantity + quant;
        await prod.update({ quantity: newQuan });
        prod.save();
        return this.productModel.findById({ prodId });
    }
    async dataToCSV(data, filename) {
        const fields = Object.keys(data[0].schema.paths);
        const csvParser = new json2csv.Parser({ fields });
        const csv = await csvParser.parse(data);
        fs.writeFile(`${filename}.csv`, csv, err => {
            if (err) {
                throw new common_1.InternalServerErrorException('Failed converting to csv');
            }
        });
    }
    async myStock() {
        const res = await this.productModel
            .aggregate([
            {
                $group: {
                    _id: '$title',
                    totalAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
                },
            },
        ])
            .exec();
        return res.map((element) => {
            return {
                title: element._id,
                totalAmount: element.totalAmount,
            };
        });
    }
    async handleCron() {
        const prodData = await this.getProducts({ sector: 'MAN', role: 'ADMIN' });
        const salesData = await this.salesService.getDailySales({ sector: 'MAN' });
        await this.dataToCSV(salesData, 'dailysales');
        mailer_1.sendEmail();
        console.log('mail sent');
    }
};
__decorate([
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "insertProduct", null);
__decorate([
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "getProducts", null);
__decorate([
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_prod_dto_1.FindProductDto]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "getProductsWithFilter", null);
__decorate([
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "getSingleProduct", null);
__decorate([
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_models_1.Product, Object]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "updateProduct", null);
__decorate([
    __param(1, get_user_role_decrator_1.GetUserRole()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "deleteProduct", null);
__decorate([
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "sell", null);
__decorate([
    schedule_1.Cron('0 0 17 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "handleCron", null);
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        sales_service_1.SalesService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map