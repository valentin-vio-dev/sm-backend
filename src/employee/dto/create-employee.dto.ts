import { Role } from '../../role/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';

export class CreateEmployeeDTO {
  @ApiProperty({ example: 'Employee' })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Dummy' })
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'employee.dummy' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'employee.dummy@sm.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'secretpassword123' })
  @IsNotEmpty()
  @Length(8, 32)
  password: string;

  @ApiProperty({
    type: 'enum',
    enum: [Role.SUPER_ADMIN, Role.ADMIN, Role.EMPLOYEE],
    default: Role.EMPLOYEE,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
