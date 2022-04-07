import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
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

  @Put('/:id')
  @ApiOperation({
    summary: 'Update product by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return updated product.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found!',
  })
  async update(
    @Body() body: UpdateProductDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productService.update(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete product.' })
  @ApiResponse({ status: 200, description: 'Product deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<null> {
    return await this.productService.delete(id);
  }
}
