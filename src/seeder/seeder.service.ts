import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Customer)
    private clienteRepository: Repository<Customer>,
  ) {}

  async seedClientes(): Promise<void> {
    const clientes = [
      { id: 1, limite: 100000, saldo: 0 },
      { id: 2, limite: 80000, saldo: 0 },
      { id: 3, limite: 1000000, saldo: 0 },
      { id: 4, limite: 10000000, saldo: 0 },
      { id: 5, limite: 500000, saldo: 0 },
    ];

    await Promise.all(
      clientes.map(async (clienteData) => {
        const cliente = this.clienteRepository.create(clienteData);
        await this.clienteRepository.save(cliente);
      }),
    );
  }
}
