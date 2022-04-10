import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import {
  paginate,
  PaginationResult,
  PaginatorOptions,
} from 'src/utils/paginator/paginator';
import { DeleteResult, Repository } from 'typeorm';
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

  private getBaseQuery(order?: { sort: string; order: string }) {
    let query = this.productRepository.createQueryBuilder('e');
    if (order) {
      query = query.addOrderBy(order.sort, order.order as any);
    }
    return query;
  }

  async findPaginated(
    paginatorOptions: PaginatorOptions,
  ): Promise<PaginationResult<Product>> {
    const query = this.getBaseQuery({
      sort: 'e.name',
      order: paginatorOptions.order,
    });

    if (!paginatorOptions.currentPage || !paginatorOptions.limit) {
      throw new BadRequestException(
        'Page and limit query parameters are required!',
      );
    }
    return await paginate(query, paginatorOptions);
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product is not found!');
    }

    return product;
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
      throw new NotFoundException('Product is not found!');
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

  async delete(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product is not found!');
    }

    const res: DeleteResult = await this.productRepository.delete({ id });
    if (res.affected === 0) {
      throw new BadRequestException();
    }

    return null;
  }
}
