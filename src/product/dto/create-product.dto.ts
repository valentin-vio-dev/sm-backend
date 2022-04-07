import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ example: 'CK454ML23' })
  readonly productCode: string;

  @ApiProperty({ example: 'Example product' })
  readonly name: string;

  @ApiProperty({ example: 1225.5 })
  readonly price: number;

  @ApiProperty({ example: 20, required: false, default: 0 })
  @IsOptional()
  readonly discount: number;

  @ApiProperty({ example: '1_YEAR' })
  @IsOptional()
  guarantee: string;

  @ApiProperty({ example: 'AVAILABLE' })
  @IsOptional()
  avaibility: string;

  @ApiProperty({ example: 'Short description', required: false })
  @IsOptional()
  readonly shortDescription: string;

  @ApiProperty({ example: 'Long description', required: false })
  @IsOptional()
  readonly longDescription: string;

  @ApiProperty({ example: 1 })
  readonly manufacturerId: number;

  @ApiProperty({ example: ['example.png', 'image.png'], required: false })
  readonly images: string[];
}
