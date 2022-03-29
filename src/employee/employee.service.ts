import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Role } from '../role/role.enum';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
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
    return await this.employeeRepository.save(employee).catch((err) => {
      if ((err.detail as string).toUpperCase().includes('ALREADY EXISTS')) {
        throw new BadRequestException('Employee already exists!');
      }
      return err;
    });
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
}
