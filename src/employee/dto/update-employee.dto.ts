import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDTO } from './create-employee.dto';

export class UpdateEmployeeDTO extends PartialType(
  OmitType(CreateEmployeeDTO, ['role', 'password'] as const),
) {}
