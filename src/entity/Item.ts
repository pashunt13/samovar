import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { BasketItem } from "./BasketItem";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;
  
  @Column("varchar")
  description: string;
  
  @Column("varchar")
  portion: string;
  
  @Column("integer")
  price: number;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @OneToMany(() => BasketItem, (BasketItem) => BasketItem.item)
  basketItems: BasketItem[];
}