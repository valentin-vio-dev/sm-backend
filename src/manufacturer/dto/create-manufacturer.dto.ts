import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateManufacturerDTO {
  @ApiProperty({ example: 'Manufacturer' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Company' })
  @IsNotEmpty()
  readonly companyName: string;

  @ApiProperty({ example: '+6312434734', required: false })
  readonly phone: string;

  @ApiProperty({ example: 'manufacturer.dummy@sm.com', required: false })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: 'www.manufacturer.com', required: false })
  readonly wesite: string;

  @ApiProperty({
    example: 'Some description for manufacturer',
    required: false,
  })
  @Length(0, 512)
  @IsOptional()
  readonly description: string;
}
