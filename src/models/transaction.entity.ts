import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
@Index('idx_transaction_id', ['id'])
@Index('idx_transaction_customer_id', ['customer'])
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  valor: number;

  @Column({ type: "char", length: 1 })
  tipo: string;

  @Column({ length: 10 })
  descricao: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  realizada_em: Date;

  @ManyToOne(() => Customer, (customer) => customer.transacoes)
  customer: Customer;
}
