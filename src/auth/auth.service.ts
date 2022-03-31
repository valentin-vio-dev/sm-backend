import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/employee/employee.entity';
import { Customer } from 'src/customer/customer.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  public getToken(user: Employee | Customer): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
      roles: user.role,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async loginEmployee(user: Employee) {
    await this.employeeRepository.save(
      new Employee({ ...user, lastLoginDate: new Date(Date.now()) }),
    );

    return {
      token: this.getToken(user),
    };
  }
}
