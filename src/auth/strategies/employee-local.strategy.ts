import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { Employee } from 'src/employee/employee.entity';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeLocalStrategy extends PassportStrategy(
  Strategy,
  'employee-local',
) {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super();
  }
  public async validate(username: string, password: string): Promise<any> {
    const employee = await this.employeeRepository.findOne({
      where: {
        username,
      },
    });

    if (!employee) {
      throw new UserNotFoundException('Employee not found!');
    }

    if (password !== employee.password) {
      throw new UnauthorizedException('Employee not found!');
    }

    return employee;
  }
}
