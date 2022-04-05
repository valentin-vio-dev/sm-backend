import { PartialType } from '@nestjs/swagger';
import { Product } from '../product.entity';

export class UpdateProductDTO extends PartialType(Product) {}
