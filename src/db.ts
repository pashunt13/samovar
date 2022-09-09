import 'reflect-metadata';
import { Item } from './entity/Item';
import { BasketItem } from './entity/BasketItem';
import { Category } from './entity/Category';
import { Order } from './entity/Order';
import { User } from './entity/User';
import { OrderedItem } from './entity/OrderedItem';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'host',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'samovarDB',
  entities: [Item, BasketItem, Category, Order, OrderedItem, User],
  logging: true,
});

async function prepareConnection() {
  if (AppDataSource.isInitialized) {
    return AppDataSource;
  }

  try {
    await AppDataSource.initialize();
    console.log('DataSource has been initialized');
    return AppDataSource;
  } catch (error) {
    throw `DataSource initialization error: ${error}`;
  }
}

export { AppDataSource, prepareConnection };
