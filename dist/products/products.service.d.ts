import { SalesService } from './../sales/sales.service';
import { FindProductDto } from './dto/find-prod-dto';
import { User } from './../users/users.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.models';
import { Model } from 'mongoose';
export declare class ProductsService {
    private readonly productModel;
    private readonly userModel;
    private salesService;
    private products;
    constructor(productModel: Model<Product>, userModel: Model<User>, salesService: SalesService);
    insertProduct(product: CreateProductDto, user: any): Promise<Product>;
    manualMigrations(): Promise<string>;
    getProducts(user: any): Promise<Product[]>;
    getProductsWithFilter(user: any, filterDto: FindProductDto): Promise<Product[]>;
    getSingleProduct(prodId: string, user: any): Promise<any>;
    updateProduct(prodId: string, changes: Product, user: any): Promise<Product>;
    deleteProduct(prodId: string, role: any): Promise<string>;
    sell(prodId: string, quant: number, user: any): Promise<Product>;
    buy(prodId: string, quant: number): Promise<Product>;
    dataToCSV(data: any, filename: any): Promise<void>;
    myStock(): Promise<any>;
    handleCron(): Promise<void>;
}
