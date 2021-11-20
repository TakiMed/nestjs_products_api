import { Sector } from './../users/user.role.enum';
import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any>;
export declare class Product extends mongoose.Document {
    _id: string;
    title: string;
    description: string;
    imgUrl: string;
    price: number;
    quantity: number;
    creator: {
        type: mongoose.Schema.Types.String;
        ref: 'User';
    };
    sector: Sector;
}
