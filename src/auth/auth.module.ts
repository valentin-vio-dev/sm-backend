import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { Employee } from 'src/employee/employee.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthService } from './auth.service';
import { EmployeeLocalStrategy } from './strategies/employee-local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    EmployeeModule,
    CustomerModule,
    TypeOrmModule.forFeature([Employee, Customer]),
    JwtModule.registerAsync({
      useFactory: getJwtConfig(),
    }),
    PassportModule,
  ],
  providers: [AuthService, EmployeeLocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
