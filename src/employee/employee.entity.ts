import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeRole } from './employee-role.enum';

@Entity('employee')
export class EmployeeEntity {
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

  @ApiProperty({ example: EmployeeRole.EMPLOYEE })
  @Column({ type: 'enum', enum: EmployeeRole })
  role: EmployeeRole;

  @ApiProperty()
  @Column({ nullable: true })
  lastLoginDate: Date;
}
