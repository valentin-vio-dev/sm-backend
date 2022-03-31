import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Employee } from 'src/employee/employee.entity';
import { AuthService } from './auth.service';
import { EmployeeLocalStrategy } from './strategies/employee-local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmployeeJwtStrategy } from './strategies/employee-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Customer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: getJwtConfig(),
    }),
  ],
  providers: [AuthService, EmployeeLocalStrategy, EmployeeJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
