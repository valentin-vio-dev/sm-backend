import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Employee } from 'src/employee/employee.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { Product } from 'src/product/product.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Employee, Customer, Manufacturer, Product],
    synchronize: true,
  }),
);
