import { ProductsService } from './../products/products.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SalesService } from './sales.service';
import { Controller, UseGuards, Get, Post } from '@nestjs/common';



@ApiTags('Sales')
@Controller('sales')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class SalesController {
    constructor( private readonly salesService: SalesService ) {}

    @Get()
    async sales(@GetUser() user){
    return await this.salesService.getDailySales(user);}

    @Post('/migrations')
    async migrations(){
        return await this.salesService.sellProducts();
    }

}
