import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/models/customer.entity";
import { Transaction } from "src/models/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(customerId: number, valor: number, tipo: string, descricao: string) {
    const customer = await this.customersRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    const transaction = new Transaction();
    transaction.valor = valor;
    transaction.tipo = tipo;
    transaction.descricao = descricao;
    transaction.realizada_em = new Date();

    if (tipo === 'd' && (customer.saldo - valor) < (-customer.limite)) {
      throw new HttpException('Transação inválida - saldo insuficiente', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (tipo === 'd') {
      customer.saldo -= valor;
    } else {
      customer.saldo += valor;
    }

    transaction.customer = customer;

    await this.transactionsRepository.save(transaction);
    await this.customersRepository.save(customer);

    return {
      limite: customer.limite,
      saldo: customer.saldo,
    };
  }
}