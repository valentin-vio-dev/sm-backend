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
import { AuthModule } from './auth/auth.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { StorageModule } from './storage/storage.module';

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
    AuthModule,
    ManufacturerModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
