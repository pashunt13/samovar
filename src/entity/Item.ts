import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;
  
  @Column("integer")
  price: number;

  @Column("varchar")
  image?: string;

  @ManyToOne(() => Category, (category) => category)
  category: Category;
}