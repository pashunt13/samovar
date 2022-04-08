import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BasketItem } from "./BasketItem";
import { Orders } from "./Orders";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  login: string;

  @Column("varchar")
  password: string;

  @OneToMany(() => Orders, (order) => order.users)
  orders: Orders[];

  @OneToMany(() => BasketItem, (BasketItem) => BasketItem.item)
  basketItems: BasketItem[];
}