import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  date: Date;
  
  @ManyToOne(() => Users, (user) => user.orders)
  users: Users;
}