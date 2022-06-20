import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}