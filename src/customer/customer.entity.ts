import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.enum';

@Entity('customer')
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Customer' })
  @Column()
  firstname: string;

  @ApiProperty({ example: 'Dummy' })
  @Column()
  lastname: string;

  @ApiProperty({ example: 'customer.dummy' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'customer.dummy@sm.com' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ example: Role.EMPLOYEE })
  @Column({ type: 'enum', enum: Role })
  role: Role;
}
