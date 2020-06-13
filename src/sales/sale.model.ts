import { Sector } from './../users/user.role.enum';
import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema({
productId: { type: String },
price: { type: Number },
quantity: { type: Number },
sector: { type: Sector },
date: { type: Date }
});

export class Sale extends mongoose.Document {
_id: string;
productId:string;
price: number;
quantity: number;
sector: Sector;
date: Date;
}

module.exports = mongoose.model('Sale', SaleSchema);
