import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  tel: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  login: string;

  @Column("varchar")
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}