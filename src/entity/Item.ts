import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;
  
  @Column("varchar")
  description?: string;
  
  @Column("varchar")
  portion?: string;
  
  @Column("integer")
  price: number;

  @ManyToOne(() => Category, (category) => category)
  category?: Category;
}