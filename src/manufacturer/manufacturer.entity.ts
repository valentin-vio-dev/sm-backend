import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('manufacturer')
export class Manufacturer {
  constructor(partial: Partial<Manufacturer>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Manufacturer' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'Company' })
  @Column()
  companyName: string;

  @ApiProperty({ example: '+6312434734' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'manufacturer.dummy@sm.com' })
  @IsEmail()
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ example: 'www.manufacturer.com' })
  @Column({ nullable: true })
  wesite: string;

  @ApiProperty({ example: 'Some description for manufacturer' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'example.png' })
  @Column({ nullable: true })
  image: string;
}
