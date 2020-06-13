import { SalesModule } from './../sales/sales.module';
import { SaleSchema } from './../sales/sale.model';
import { SalesService } from './../sales/sales.service';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './../auth/auth.module';
import { UserSchema } from '../users/users.model';
import { Module, forwardRef } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Sale', schema: SaleSchema}
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UsersModule,
    // insert salary
    forwardRef(()=>SalesModule)
  ],
  controllers: [ProductsController],
  providers: [
    SalesService,
    ProductsService
  ],
  exports:[ProductsModule]
})

export class ProductsModule {}
