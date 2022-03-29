import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EmployeeRole } from '../employee-role.enum';

export class UpdateEmployeeRoleDTO {
  @ApiProperty({
    type: 'enum',
    enum: EmployeeRole,
  })
  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  readonly role: EmployeeRole;
}
