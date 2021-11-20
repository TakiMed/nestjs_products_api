import { SalesService } from './../sales/sales.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './product.models';
import { FindProductDto } from './dto/find-prod-dto';
export declare class ProductsController {
    private readonly productsService;
    private readonly salesService;
    constructor(productsService: ProductsService, salesService: SalesService);
    addProduct(product: CreateProductDto, user: any): Promise<Product>;
    migrate(): Promise<string>;
    getAmount(): Promise<any>;
    getProducts(user: any, filterDto: FindProductDto): Promise<Product[]>;
    getProduct(prodId: string, user: any): Promise<Product>;
    updateProduct(prodId: string, changes: Product, user: any): Promise<Product>;
    sell(prodId: string, newQuan: number, user: any): Promise<Product>;
    buy(prodId: string, newQuan: number): Promise<Product>;
    removeProduct(prodId: string, role: any): Promise<string>;
}
