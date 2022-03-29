import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.enum';

@Entity('employee')
export class Employee {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Employee' })
  @Column()
  firstname: string;

  @ApiProperty({ example: 'Dummy' })
  @Column()
  lastname: string;

  @ApiProperty({ example: 'employee.dummy' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'employee.dummy@sm.com' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ example: Role.EMPLOYEE })
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ApiProperty()
  @Column({ nullable: true })
  lastLoginDate: Date;
}
