import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Item } from "./Item";
import { Users } from "./Users";

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.basketItems)
  item: Item;

  @Column("integer")
  quantity: number;

  @ManyToOne(() => Users, (user) => user.orders)
  users: Users;
}