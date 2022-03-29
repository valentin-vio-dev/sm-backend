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
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all employees.' })
  @ApiResponse({
    status: 200,
    description: 'Return all employees.',
    type: [Employee],
  })
  async findAll(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by id.' })
  @ApiResponse({
    status: 200,
    description: 'Return employee by id.',
    type: Employee,
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return await this.employeeService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new employee.' })
  @ApiCreatedResponse({
    description: 'Return the created employee.',
    type: Employee,
  })
  async create(@Body() body: CreateEmployeeDTO): Promise<Employee> {
    return this.employeeService.create(body);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: "Update employee's role." })
  @ApiResponse({
    status: 200,
    description: 'Return updated employee.',
    type: [Employee],
  })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeRoleDTO,
  ): Promise<Employee> {
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
