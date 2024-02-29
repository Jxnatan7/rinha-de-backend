import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/models/customer.entity";
import { Transaction } from "src/models/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    customerId: number,
    valor: number,
    tipo: string,
    descricao: string
  ) {
      const customer = await this.customerRepository.findOne({ where: { id: customerId } });
      if (!customer) {
        throw new HttpException("Cliente não encontrado", HttpStatus.NOT_FOUND);
      }

      const transaction = new Transaction();
      transaction.valor = valor;
      transaction.tipo = tipo;
      transaction.descricao = descricao;
      transaction.realizada_em = new Date();
      transaction.customer = customer;

      if (tipo === "d" && (customer.saldo - valor) < customer.limite) {
        throw new HttpException("Transação inválida - saldo insuficiente", HttpStatus.UNPROCESSABLE_ENTITY);
      }

      if (tipo === "d") {
        customer.saldo -= valor;
      } else if (tipo === "c") {
        customer.saldo += valor;
      }

      await this.transactionRepository.save(transaction);
      await this.customerRepository.save(customer);

      return {
        limite: customer.limite,
        saldo: customer.saldo,
      };
  }
}