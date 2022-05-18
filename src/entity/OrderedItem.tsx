import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Item } from './Item';

@Entity()
export class OrderedItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderedItems)
  order: Order;

  @ManyToOne(() => Item)
  item: Item;

  @Column('integer')
  quantity: number;
}
