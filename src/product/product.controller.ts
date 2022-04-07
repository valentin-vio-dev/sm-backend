import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all product.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all product.',
    type: [Product],
  })
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create new product.',
  })
  @ApiCreatedResponse({
    description: 'Return the created product.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Product or manufacturer already exists.',
  })
  create(@Body() body: CreateProductDTO) {
    return this.productService.create(body);
  }
}
