import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './sale.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from 'src/products/product.models';


@Injectable()
export class SalesService {
    private products: Sale[] = [];
    constructor(
      @InjectModel('Sale') private readonly saleModel: Model<Sale>,
      @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async insertSale(
      prodId:string,
      quantity:number,
      user,
    ) {
        const newSale = await this.saleModel.create({});
        const prod= await this.productModel.findById(prodId);
        newSale.productId = prodId;
        newSale.price = prod.price;
        newSale.quantity = quantity;
        newSale.sector = user.sector;
        newSale.date = new Date();
        newSale.save();
      }

    async getAllSales(user){
      if(user.sector==='MAN'){ return await this.saleModel.find({})}
      else throw new BadRequestException('Restricted rights');
    }

    async getDailySales(user){
      const sales = await this.getAllSales(user);
      const today = new Date().getTime();
      const yesterday = new Date(today-86400000);
      const filtered = sales.filter( sale => sale.date > yesterday)
      // await this.productsService.dataToCSV(filtered,'daliysales');
      return filtered;
    }

    async sellProducts(){
      const prods = await this.productModel.find({});
      prods.forEach((prod)=>this.insertSale(prod._id,5,{sector:prod.sector}));
      return 'PRODUCTS SOLD';
    }
}


