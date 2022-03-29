import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getOrmConfig } from './config/orm';
import ormConfigDev from './config/orm/orm.config.dev';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfigDev],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig(),
    }),
    EmployeeModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
