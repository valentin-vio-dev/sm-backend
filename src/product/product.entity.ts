import { ApiProperty } from '@nestjs/swagger';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'CK454ML23' })
  @Column({ unique: true })
  productCode: string;

  @ApiProperty({ example: 'Example product' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 1225.5 })
  @Column({ type: 'real' })
  price: number;

  @ApiProperty({ example: 20 })
  @Column({ nullable: true, default: 0 })
  discount: number;

  @ApiProperty({ example: '1_YEAR' })
  @Column({ nullable: true })
  guarantee: string;

  @ApiProperty({ example: 'AVAILABLE' })
  @Column({ nullable: true })
  avaibility: string;

  @ApiProperty({ example: 'Short description' })
  @Column({ nullable: true })
  shortDescription: string;

  @ApiProperty({ example: 'Long description' })
  @Column({ nullable: true })
  longDescription: string;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products, {
    nullable: false,
  })
  @JoinColumn()
  manufacturer: Manufacturer;

  @ApiProperty({ example: 1 })
  @Column()
  manufacturerId: number;

  @ApiProperty({ example: ['example.png', 'image.png'] })
  @Column('text', { nullable: true, array: true })
  images: string[];
}
