import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

enum FilterOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GeneralFilter {
  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 10,
  })
  limit: number;

  @ApiProperty({
    example: 'ASC',
    required: false,
    enum: FilterOrder,
  })
  @IsOptional()
  order: 'ASC' | 'DESC';
}
