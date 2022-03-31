import { PartialType } from '@nestjs/swagger';
import { CreateManufacturerDTO } from './create-manufacturer.dto';

export class UpdateManufacturerDTO extends PartialType(CreateManufacturerDTO) {}
