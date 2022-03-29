import { Module } from '@nestjs/common';
import { EmployeeEntity } from './employee.entity';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
