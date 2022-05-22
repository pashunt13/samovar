import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { OrderedItem } from './OrderedItem';

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderedItem, (orderedItem) => orderedItem.order, {cascade: true})
  orderedItems: OrderedItem[];
}