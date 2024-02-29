import { Body, Controller, Get, HttpCode, HttpException, Param, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";  
import { TransactionService } from "../Transaction/transaction.service";
import { TransactionsRequest } from "src/dto/TransactionRequest";
import { EntityManager  } from "typeorm";

@Controller("clientes")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post(":id/transacoes")
  @HttpCode(200)
  async createTransaction(
    @Param("id") id: number,
    @Body() body: TransactionsRequest
  ) {
    const { valor, tipo, descricao } = body;
    try {
      const result = await this.transactionService.createTransaction(id, valor, tipo, descricao);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(":id/extrato")
  async getStatement(@Param("id") id: number) {
    try {
      const statement = await this.customerService.getStatement(id);
      return statement;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}