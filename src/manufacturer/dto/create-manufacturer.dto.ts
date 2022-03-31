import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateManufacturerDTO {
  @ApiProperty({ example: 'Manufacturer' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Company' })
  @IsNotEmpty()
  readonly companyName: string;

  @ApiProperty({ example: '+6312434734' })
  readonly phone: string;

  @ApiProperty({ example: 'manufacturer.dummy@sm.com' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: 'www.manufacturer.com' })
  readonly wesite: string;

  @ApiProperty({ example: 'Some description for manufacturer' })
  @Length(0, 512)
  @IsOptional()
  readonly description: string;
}
