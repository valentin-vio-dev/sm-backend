import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private manufacturerService: ManufacturerService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(product: CreateProductDTO) {
    const existingProduct = await this.productRepository.findOne({
      where: [
        {
          productCode: product.productCode,
        },
        {
          name: product.name,
        },
      ],
    });

    if (existingProduct) {
      throw new BadRequestException('Product already exists!');
    }

    const manufacturer = await this.manufacturerService.findById(
      product.manufacturerId,
    );

    const prod: Product = new Product({
      ...product,
      manufacturerId: manufacturer.id,
    });

    return await this.productRepository.save(prod);
  }

  async update(id: number, update: UpdateProductDTO): Promise<Product> {
    const productById = await this.productRepository.findOne(id);

    if (!productById) {
      throw new NotFoundException('Product not found!');
    }

    const existingProduct = await this.productRepository.findOne({
      where: [
        {
          productCode: update.productCode,
        },
        {
          name: update.name,
        },
      ],
    });

    if (existingProduct && existingProduct.id !== id) {
      throw new BadRequestException('Product already exists!');
    }

    const manufacturer = await this.manufacturerService.findById(
      update.manufacturerId,
    );

    const updated: Product = new Product({
      ...productById,
      ...update,
      manufacturerId: manufacturer.id,
    });

    return await this.productRepository.save(updated);
  }
}
