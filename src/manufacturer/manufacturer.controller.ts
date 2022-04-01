import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/role/guards/admin/admin.guard';
import { EmployeeGuard } from 'src/role/guards/employee/employee.guard';
import { SuperAdminGuard } from 'src/role/guards/super-admin/super-admin.guard';
import { CreateManufacturerDTO } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDTO } from './dto/update-manufactuer.dto';
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
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard('employee-jwt'), AdminGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreateManufacturerDTO): Promise<Manufacturer> {
    return await this.manufacturerService.create(body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete manufacturer.' })
  @ApiResponse({ status: 200, description: 'Manufacturer deleted.' })
  @ApiResponse({ status: 404, description: 'Manufacturer not found.' })
  @UseGuards(AuthGuard('employee-jwt'), SuperAdminGuard)
  @ApiBearerAuth()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<null> {
    return await this.manufacturerService.delete(id);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update manufacturer.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return updated manufacturer.',
  })
  @ApiResponse({ status: 404, description: 'Manufacturer not found.' })
  async updateManufacturer(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateManufacturerDTO,
  ): Promise<Manufacturer> {
    return await this.manufacturerService.updateManufacturer(id, body);
  }
}
