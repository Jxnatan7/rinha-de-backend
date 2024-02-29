import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "./config/orm.config";
import { CustomerService } from "./modules/Customer/customer.service";
import { TransactionService } from "./modules/Transaction/transaction.service";
import { Customer } from "./models/customer.entity";
import { Transaction } from "./models/transaction.entity";
import { CustomerController } from "./modules/Customer/customer.controller";
import { SeederService } from "./seeder/seeder.service";

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
  controllers: [CustomerController],
  providers: [CustomerService, TransactionService, SeederService],
})
export class AppModule {
  constructor(private seederService: SeederService) {
    this.seederService.seedClientes();
  }
}
