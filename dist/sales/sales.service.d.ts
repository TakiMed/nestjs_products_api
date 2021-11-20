import { Sale } from './sale.model';
import { Model } from 'mongoose';
import { Product } from 'src/products/product.models';
export declare class SalesService {
    private readonly saleModel;
    private readonly productModel;
    private products;
    constructor(saleModel: Model<Sale>, productModel: Model<Product>);
    insertSale(prodId: string, quantity: number, user: any): Promise<void>;
    getAllSales(user: any): Promise<Sale[]>;
    getDailySales(user: any): Promise<Sale[]>;
    sellProducts(): Promise<string>;
}
