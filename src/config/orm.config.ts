import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { Transaction } from 'src/models/transaction.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'rinha',
    entities: [Customer, Transaction],
    synchronize: true,
  }),
);