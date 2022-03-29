import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.enum';

@Entity('employee')
export class Employee {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Tony' })
  @Column()
  firstname: string;

  @ApiProperty({ example: 'Stark' })
  @Column()
  lastname: string;

  @ApiProperty({ example: 'tony.stark' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'tony.stark@sm.com' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ example: Role.EMPLOYEE })
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ApiProperty()
  @Column({ nullable: true })
  lastLoginDate: Date;
}
