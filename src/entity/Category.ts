import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}