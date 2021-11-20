import { Sector } from './../users/user.role.enum';
import * as mongoose from 'mongoose';
export declare const SaleSchema: mongoose.Schema<any>;
export declare class Sale extends mongoose.Document {
    _id: string;
    productId: string;
    price: number;
    quantity: number;
    sector: Sector;
    date: Date;
}
