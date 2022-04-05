import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ManufacturerModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
