import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/employee/employee.entity';
import { Customer } from 'src/customer/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  public getToken(user: Employee | Customer): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
      roles: user.role,
    });
  }
}
