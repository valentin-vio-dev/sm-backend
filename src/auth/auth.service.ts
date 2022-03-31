import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/employee/employee.entity';
import { Customer } from 'src/customer/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
}
