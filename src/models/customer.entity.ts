import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  limite: number;

  @Column({ type: 'integer', default: 0 })
  saldo: number;

  @OneToMany(() => Transaction, transaction => transaction.customer)
  transacoes: Transaction[];
}