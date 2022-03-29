import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../role/role.enum';

export class UpdateEmployeeRoleDTO {
  @ApiProperty({
    type: 'enum',
    enum: Role,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
