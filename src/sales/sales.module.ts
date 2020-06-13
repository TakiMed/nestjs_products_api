import { ProductsService } from './../products/products.service';
import { UserSchema } from './../users/users.model';
import { ProductSchema } from './../products/product.models';
import { UsersModule } from './../users/users.module';
import { AuthModule } from './../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SaleSchema } from './sale.model';
import { ProductsModule } from 'src/products/products.module';
import { SalesController } from './sales.controller';


@Module({
  imports:[
    MongooseModule.forFeature([
          { name: 'Sale', schema: SaleSchema },
          { name: 'Product', schema: ProductSchema }
        ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UsersModule,
    forwardRef(()=> ProductsModule)
  ],
  providers: [SalesService],
  exports: [SalesService],
  controllers: [SalesController]
})

export class SalesModule {}
