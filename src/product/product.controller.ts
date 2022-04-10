import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeGuard } from 'src/role/guards/employee/employee.guard';
import { SuperAdminGuard } from 'src/role/guards/super-admin/super-admin.guard';
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
    description: 'Returns all product.',
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
    description: 'Returns created product.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Product already exists or manufacturer is not found.',
  })
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
  create(@Body() body: CreateProductDTO) {
    return this.productService.create(body);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update product.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns updated product.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Product is not found!',
  })
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
  async update(
    @Body() body: UpdateProductDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productService.update(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete product.' })
  @ApiResponse({ status: 200, description: 'Product deleted.' })
  @ApiResponse({ status: 404, description: 'Product is not found.' })
  @UseGuards(AuthGuard('employee-jwt'), SuperAdminGuard)
  @ApiBearerAuth()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<null> {
    return await this.productService.delete(id);
  }
}
