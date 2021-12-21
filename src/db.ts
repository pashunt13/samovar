import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";

export function getItemsData() {
  return (
    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "samovarDB",
        entities: [
          __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        logging: false
    }).then(async connection => {
      
      let item = new Item();
      let itemRepository = connection.getRepository(Item);

      // решил пока отключить, вместо этого создал объект ниже
      // let allItems = await itemRepository.find();
      // console.log("All items from the db: ", allItems);

      const allItems = [{
        id: 1,
        title: 'eda',
        price: 100500
      },
      {
        id: 2,
        title: 'drugaya eda',
        price: 12345
      }];

      return allItems;
    }).catch(error => console.log(error))
  )
}