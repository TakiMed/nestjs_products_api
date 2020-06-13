import { SalesService } from './../sales/sales.service';
import { SellOrBuyDTO } from './dto/sell-and-buy-dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.models';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetUserRole } from 'src/auth/get-user-role.decrator';
import { FindProductDto } from './dto/find-prod-dto';

@ApiTags('Products')
@Controller('products')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 409, description: 'User already exists.' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
              private readonly salesService: SalesService) {}


  @Post()
  @ApiBody({ type: CreateProductDto })
  async addProduct(
    @Body() product: CreateProductDto,
    @GetUser() user,
  ): Promise<Product> {
    return await this.productsService.insertProduct(product, user._id);
  }

  @Post('/migrations')
  async migrate(){
    return await this.productsService.manualMigrations();
  }

  @Get('stock')
  async getAmount(){
    return this.productsService.myStock();
  }

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'quantity', required: false, type: Number })
  async getProducts(
    @GetUser() user,
    @Query() filterDto: FindProductDto,
  ): Promise<Product[]> {
// if any searchterms passed call filter function, else get all by user priviledge
    if (Object.keys(filterDto).length) {
      return await this.productsService.getProductsWithFilter(user, filterDto);
    } else {
      return await this.productsService.getProducts(user);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string, @GetUser() user): Promise<Product> {
    const product = await this.productsService.getSingleProduct(prodId, user);
    return product;
  }


  @Patch(':id')
  @ApiBody({ type: CreateProductDto })
  async updateProduct(
    @Param('id') prodId: string,
    @Body() changes: Product,
    @GetUser() user,
  ): Promise<Product> {
    const result = await this.productsService.updateProduct(
      prodId,
      changes,
      user,
    );
    return result;
  }

  @Patch('sell/:id')
  @ApiBody({ type: SellOrBuyDTO })
  async sell(
    @Param('id') prodId: string,
    @Body('quantity') newQuan: number,
    @GetUser() user
  ): Promise<Product> {
    const res = await this.productsService.sell(prodId, newQuan, user);
    return res;
  }

  @Patch('buy/:id')
  @ApiBody({ type: SellOrBuyDTO })
  async buy(
    @Param('id') prodId: string,
    @Body('quantity') newQuan: number,
  ): Promise<Product> {
    const res = await this.productsService.buy(prodId, newQuan);
    return res;
  }

  @Delete(':id')
  async removeProduct(
    @Param('id') prodId: string,
    @GetUserRole() role,
  ): Promise<string> {
    return await this.productsService.deleteProduct(prodId, role);
  }
}
