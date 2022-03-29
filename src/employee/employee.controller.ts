import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeRoleDTO } from './dto/update-employee-role.dto';
import { EmployeeEntity } from './employee.entity';
import { EmployeeService } from './employee.service';

@ApiTags('employeees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all employees.' })
  @ApiResponse({
    status: 200,
    description: 'Return all employees.',
    type: [EmployeeEntity],
  })
  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by id.' })
  @ApiResponse({
    status: 200,
    description: 'Return employee by id.',
    type: EmployeeEntity,
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EmployeeEntity> {
    return await this.employeeService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new employee.' })
  @ApiCreatedResponse({
    description: 'Return the created employee.',
    type: EmployeeEntity,
  })
  async create(@Body() body: CreateEmployeeDTO): Promise<EmployeeEntity> {
    return this.employeeService.create(body);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: "Update employee's role." })
  @ApiResponse({
    status: 200,
    description: 'Return updated employee.',
    type: [EmployeeEntity],
  })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeRoleDTO,
  ): Promise<EmployeeEntity> {
    return this.employeeService.updateRole(id, body.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee.' })
  @ApiResponse({ status: 200, description: 'Employee deleted.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.delete(id);
  }
}
