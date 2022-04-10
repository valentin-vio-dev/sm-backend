import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
  })
  @IsOptional()
  order: 'ASC' | 'DESC';
}
