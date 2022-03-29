import { EmployeeRole } from '../employee-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';

export class CreateEmployeeDTO {
  @ApiProperty({ example: 'Tony' })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Stark' })
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'tony.stark' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'tony.stark@sm.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'secretpassword123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'enum',
    enum: EmployeeRole,
    default: EmployeeRole.EMPLOYEE,
  })
  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  readonly role: EmployeeRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT),
    );
  }
}
