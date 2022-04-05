import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
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
    const manufacturer = await this.manufacturerService.findById(
      product.manufacturerId,
    );

    const existingProduct = await this.productRepository.find({
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

    const prod: Product = new Product({
      ...product,
      manufacturer,
    });

    return this.productRepository.save(prod);
  }
}
