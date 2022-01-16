import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;
  
  @Column("varchar")
  description: string;
  
  @Column("integer")
  category: number;
  
  @Column("varchar")
  portion: string;
  
  @Column("integer")
  price: number;
}


