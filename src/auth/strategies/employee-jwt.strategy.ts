import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { Employee } from 'src/employee/employee.entity';
import { Repository } from 'typeorm';
import { ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class EmployeeJwtStrategy extends PassportStrategy(
  Strategy,
  'employee-jwt',
) {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(payload: any) {
    if (
      payload.roles !== 'SUPER_ADMIN' &&
      payload.roles !== 'ADMIN' &&
      payload.roles !== 'EMPLOYEE'
    ) {
      throw new UnauthorizedException('Not enough permission!');
    }
    return await this.employeeRepository.findOne(payload.sub);
  }
}
