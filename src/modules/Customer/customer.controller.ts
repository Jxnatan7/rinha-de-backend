import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from "@nestjs/common";
import { CustomersService } from "./customer.service";
import { TransactionsService } from "../Transaction/transaction.service";
import { TransactionsRequest } from "src/dto/TransactionRequest";

@Controller("clientes")
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post(":id/transacoes")
  async createTransaction(
    @Param("id") id: number,
    @Body() body: TransactionsRequest,
  ) {
    const { valor, tipo, descricao } = body;
    try {
      const transaction = await this.transactionsService.createTransaction(
        id,
        valor,
        tipo,
        descricao,
      );
      return transaction;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(":id/extrato")
  async getStatement(@Param("id") id: number) {
    try {
      const statement = await this.customersService.getStatement(id);
      return statement;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
