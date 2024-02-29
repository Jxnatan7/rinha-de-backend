import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
@Index('idx_customer_id', ['id'])
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", default: 0 })
  limite: number;

  @Column({ type: "integer", default: 0 })
  saldo: number;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transacoes: Transaction[];
}
