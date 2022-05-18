import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item)
  item: Item;

  @Column("integer")
  quantity: number;

  @ManyToOne(() => User, (user) => user)
  user: User;
}