import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    sales(user: any): Promise<import("./sale.model").Sale[]>;
    migrations(): Promise<string>;
}
