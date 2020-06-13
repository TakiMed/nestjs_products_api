import { PRODUCTS } from './add.products';
import { SalesService } from './../sales/sales.service';
import { FindProductDto } from './dto/find-prod-dto';
import { SellOrBuyDTO } from './dto/sell-and-buy-dto';
import { sendEmail } from './../mailer';
import { UserRole, Sector } from './../users/user.role.enum';
import { Cron } from '@nestjs/schedule';
import { User } from './../users/users.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.models';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetUserRole } from 'src/auth/get-user-role.decrator';
import * as fs from 'fs';
import * as json2csv from 'json2csv';
import * as moment from 'moment';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private salesService: SalesService,
  ) {}
// insert a prouct into DB and automatically save sector and creator based on user
  async insertProduct(
    product: CreateProductDto,
    @GetUser() user,
  ): Promise<Product> {
    const existing = await this.productModel.findOne({ title: product.title });
    if (existing) {
      throw new BadRequestException('Product already exists');
    } else {
      const newProd = await this.productModel.create(product);
      newProd.creator = user._id;
      newProd.sector = user.sector;
      await newProd.save();
      return newProd;
    }
  }

// insert 10 products from different secotrs manually

  async manualMigrations(): Promise<string> {
    await this.productModel.insertMany(PRODUCTS);
    return 'PRODUCTS ADDED';
  }

// get products based on user, users can access only products on their sector
// manager sector users can access all secotrs

  async getProducts(@GetUser() user): Promise<Product[]> {
    const sector = user.sector;
    const role = user.role;
    const data =
      role === UserRole.USER
        ? await this.productModel.find({ sector }, { __v: 0 }).exec()
        : await this.productModel.find({}, { __v: 0 }).exec();
    return data;
  }

// filtering products by quantity --more than value and by title/descript --search char

  async getProductsWithFilter(
    @GetUser() user,
    filterDto: FindProductDto,
  ): Promise<Product[]> {
    const { search, quantity } = filterDto;
    const products = await this.getProducts(user);
    let filtered;
    if (search) {
      filtered = await products.filter(
        prod =>
          prod.title.includes(search) || prod.description.includes(search),
      );
    }
    if (quantity) {
      filtered = await products.filter(prod => prod.quantity > quantity);
    }
    return filtered;
  }

// get products by id, users are allowed to get it only from their sector, manager can access all

  async getSingleProduct(prodId: string, @GetUser() user): Promise<any> {
    const sector = user.sector;
    const role = user.role;
    const res = role === UserRole.USER
        ? await this.productModel.find({ _id: prodId, sector })
        : await this.productModel.findOne({ _id: prodId });
    if(!res) throw new NotFoundException('No such product here');
    return res;
    }

// update single products by user priviledgies

  async updateProduct(
    prodId: string,
    changes: Product,
    @GetUser() user,
  ): Promise<Product> {
    const sector = user.sector;
    const role = user.role;
    const updatedProduct =
      role === UserRole.USER
        ? await this.productModel.findOneAndUpdate(
            { _id: prodId, sector },
            changes,
            { new: true },
          )
        : await this.productModel.findByIdAndUpdate(prodId, changes, {
            new: true,
          });
    if(!updatedProduct) throw new BadRequestException('Product not found');
    return updatedProduct;
  }

// only administrators can delete products

  async deleteProduct(prodId: string, @GetUserRole() role): Promise<string> {
    if (role === UserRole.ADMIN) {
      try {
        await this.productModel.deleteOne({ _id: prodId }).exec();
        return `Product with id ${prodId} deleted`;
      } catch (error) {
        throw new NotFoundException('No such a product here');
      }
    } else {
      throw new UnauthorizedException('Restricted rights');
    }
  }
// sell product by id, enter only quantity value, interaction with sales module - creating sale
// update product quantity in products collection and insert salary in sales coll

  async sell(prodId: string, quant: number, @GetUser() user): Promise<Product> {
    const prod = await this.productModel.findOne({ _id: prodId });
    if(prod.sector===user.sector || user.role==='ADMIN'){
      const newQuan = prod.quantity - quant;
      if (newQuan >= 0) {
        await prod.updateOne({ quantity: newQuan }, { new: true});
        prod.save();
        const sale = await this.salesService.insertSale(prod._id,quant, user)
        return this.productModel.findOne({ _id: prodId });
    } else {
      throw new BadRequestException('You exceeded quantity in stock');
    }
    }
    else { throw new BadRequestException('Unauthorized request');}
  }

// buy products by id, enter only quantity value, update products qunatity in products collection

  async buy(prodId: string, quant: number): Promise<Product> {
    const prod = await this.productModel.findOne({ _id: prodId });
    const newQuan = prod.quantity + quant;
    await prod.update({ quantity: newQuan });
    prod.save();
    return this.productModel.findById({prodId});
  }

// function used for mailer attachments and can be used for any reports needed

  async dataToCSV(data,filename) {
    const fields = Object.keys(data[0].schema.paths);
    const csvParser = new json2csv.Parser({ fields });
    const csv = await csvParser.parse(data);
    fs.writeFile(`${filename}.csv`, csv, err => {
      if (err) {
        throw new InternalServerErrorException('Failed converting to csv');
      }
    });
  }

// stock  - prodname and totalAmount : quantity*price

  async myStock(): Promise<any> {
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

// send mails with 2 reports attached on closing hour, currently sent to @testninalogdts@gmail.com

  @Cron('0 0 17 * * *')
  async handleCron() {
    const prodData = await this.getProducts({sector:'MAN',role:'ADMIN'});
    const salesData = await this.salesService.getDailySales({sector:'MAN'});
    await this.dataToCSV(salesData,'dailysales');
    sendEmail();
    console.log('mail sent');
  }
}
