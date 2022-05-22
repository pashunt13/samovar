import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";
import { getConnection } from "typeorm";
import { Category } from "./entity/Category";
import { BasketItem } from "./entity/BasketItem";
import { Order } from "./entity/Order";
import { User } from "./entity/User";
import { OrderedItem } from "./entity/OrderedItem";

let connection = null;

export async function prepareConnection() {
  if (connection) return connection;
  
  // clean up old connection that references outdated hot-reload classes
  try {
    const staleConnection = getConnection();
    if (staleConnection)
      await staleConnection.close();
  } catch (error) {
    // no stale connection to clean up
  }

  // wait for new default connection
  return connection = await createConnection({
    type: "postgres",
    host: "host",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "samovarDB",
    entities: [
      Item,
      Category,
      BasketItem,
      Order,
      OrderedItem,
      User
    ],
  });
}