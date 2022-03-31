import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateManufacturerDTO } from './dto/create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerService } from './manufacturer.service';

@ApiTags('Manufacturers')
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all manufacturer',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all manufacturer',
    type: [Manufacturer],
  })
  async findAll(): Promise<Manufacturer[]> {
    return await this.manufacturerService.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get manufacturer by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return manufacturer by id',
    type: Manufacturer,
  })
  @ApiResponse({ status: 404, description: 'Manufacturer not found.' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Manufacturer> {
    return await this.manufacturerService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new manufacturer',
  })
  @ApiCreatedResponse({
    description: 'Return the created manufacturer',
    type: Manufacturer,
  })
  @ApiResponse({
    status: 400,
    description: 'Manufacturer already exists',
  })
  async create(@Body() body: CreateManufacturerDTO): Promise<Manufacturer> {
    return await this.manufacturerService.create(body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete manufacturer.' })
  @ApiResponse({ status: 200, description: 'Manufacturer deleted.' })
  @ApiResponse({ status: 404, description: 'Manufacturer not found.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<null> {
    return await this.manufacturerService.delete(id);
  }
}
