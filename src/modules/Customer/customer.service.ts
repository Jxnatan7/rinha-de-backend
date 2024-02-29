import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/models/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async getStatement(id: number) {
    const customer = await this.customerRepository.findOne( { where: { id }, relations: ["transacoes"] });
    if (!customer) {
      throw new HttpException("Cliente não encontrado", HttpStatus.NOT_FOUND);
    }

    const saldo = this.calculateSaldo(customer);
    const ultimasTransacoes = customer.transacoes.slice(0, 10).map(({ id, ...rest }) => rest);

    return {
      saldo: saldo,
      ultimas_transacoes: ultimasTransacoes,
    };
  }

  private calculateSaldo(customer: Customer): number {
    return customer.transacoes.reduce((saldo, transaction) => {
      return transaction.tipo === "d" ? saldo - transaction.valor : saldo + transaction.valor;
    }, customer.saldo);
  }
}

