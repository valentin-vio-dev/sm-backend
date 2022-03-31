import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeGuard } from 'src/role/guards/employee/employee.guard';
import { SuperAdminGuard } from 'src/role/guards/super-admin/super-admin.guard';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeRoleDTO } from './dto/update-employee-role.dto';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@ApiTags('Employees')
@Controller('employees')
@SerializeOptions({ strategy: 'exposeAll' })
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
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
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('employee-jwt'), SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new employee.' })
  @ApiCreatedResponse({
    description: 'Return the created employee.',
    type: Employee,
  })
  async create(@Body() body: CreateEmployeeDTO): Promise<Employee> {
    return this.employeeService.create(body);
  }

  @Patch(':id/role')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('employee-jwt'), SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update employee's role." })
  @ApiResponse({
    status: 200,
    description: 'Return updated employee.',
    type: Employee,
  })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeRoleDTO,
  ): Promise<Employee> {
    return this.employeeService.updateRole(id, body.role);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('employee-jwt'), SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete employee.' })
  @ApiResponse({ status: 200, description: 'Employee deleted.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.delete(id);
  }
}
