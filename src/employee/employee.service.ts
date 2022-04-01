import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Role } from '../role/role.enum';
import { Employee } from './employee.entity';
import { AuthService } from 'src/auth/auth.service';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }
    return employee;
  }

  async create(employee: CreateEmployeeDTO): Promise<Employee> {
    const existingEmployee = await this.employeeRepository.findOne({
      where: [
        {
          username: employee.username,
        },
        {
          email: employee.email,
        },
      ],
    });

    if (existingEmployee) {
      throw new BadRequestException('Employee already exists!');
    }

    const emp = new Employee(employee);
    emp.password = await this.authService.hashPassword(emp.password);
    return await this.employeeRepository.save(emp);
  }

  async delete(id: number): Promise<null> {
    const res: DeleteResult = await this.employeeRepository.delete({ id });
    if (res.affected === 0) {
      throw new NotFoundException('Employee not found!');
    }
    return null;
  }

  async updateRole(id: number, role: Role) {
    const employee: Employee = await this.employeeRepository.findOne({
      id,
    });
    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }
    employee.role = role;
    return await this.employeeRepository.save(employee);
  }

  async updateEmployee(
    id: number,
    update: UpdateEmployeeDTO,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }

    const existingEmployee = await this.employeeRepository.findOne({
      where: [
        {
          username: employee.username,
        },
        {
          email: employee.email,
        },
      ],
    });

    if (existingEmployee && existingEmployee.id !== id) {
      throw new BadRequestException('Employee already exists!');
    }

    const updated = new Employee({
      ...employee,
      ...update,
      id,
    });

    return await this.employeeRepository.save(updated);
  }
}
