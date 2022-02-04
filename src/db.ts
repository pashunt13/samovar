import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";
import { getConnection } from "typeorm";

let connection = null;

export async function prepareConnection() {
  if (connection) {return connection}
  
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
      host: "172.20.176.1",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "samovarDB",
      entities: [
        Item
      ],
    });
}