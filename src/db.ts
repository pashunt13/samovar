import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";
import { getConnection } from "typeorm";

let connectionReadyPromise: Promise<void> | null = null;

export async function prepareConnection() {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        type: "postgres",
        host: "host",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "samovarDB",
        entities: [
          Item
        ],
      });
    })();
  }

  return connectionReadyPromise;
}