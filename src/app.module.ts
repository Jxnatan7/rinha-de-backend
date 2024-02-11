import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { CustomersService } from './modules/Customer/customer.service';
import { TransactionsService } from './modules/Transaction/transaction.service';
import { Customer } from './models/customer.entity';
import { Transaction } from './models/transaction.entity';
import { CustomersController } from './modules/Customer/customer.controller';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    TypeOrmModule.forFeature([Customer, Transaction]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, TransactionsService, SeederService],
})
export class AppModule {
  constructor(private seederService: SeederService) {
    this.seederService.seedClientes();
  }
}