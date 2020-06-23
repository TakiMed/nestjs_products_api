import { Sector } from './../users/user.role.enum';
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // JS type
  imgUrl: { type:String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sector: { type: Sector }
});

export class Product extends mongoose.Document {
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
  sector:Sector;
}

module.exports = mongoose.model('Product', ProductSchema);
