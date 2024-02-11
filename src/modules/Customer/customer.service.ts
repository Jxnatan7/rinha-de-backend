import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/models/customer.entity";
import { Transaction } from "src/models/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async getStatement(id: number) {
    const customer = await this.customersRepository.findOne({ where: { id }, relations: ['transacoes'] });
    if (!customer) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    const ultimasTransacoes = customer.transacoes
      .slice(0, 10)
      .map(({ id, ...rest }) => rest);

    return {
      saldo: {
        total: customer.saldo,
        data_extrato: new Date(),
        limite: customer.limite,
      },
      ultimas_transacoes: ultimasTransacoes
    };
  }
}