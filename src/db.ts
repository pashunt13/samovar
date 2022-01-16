import "reflect-metadata";
import { createConnection } from "typeorm";
import { Items } from "./entity/Item";

export async function getItemsData() {
  return (
    createConnection().then(async connection => {
      
      let item = new Items();
      let itemRepository = connection.getRepository(Items);

      // решил пока отключить, вместо этого создал объект ниже
      // let allItems = await itemRepository.find();
      // console.log("All items from the db: ", allItems);

      const allItems = [{
        id: 1,
        title: 'Разносолы',
        price: 170
      },
      { 
        id: 2,
        title: 'Свежие овощи',
        price: 150
      },
      {
        id: 3,
        title: 'Сельдь в масле',
        price: 180
      },
      {
        id: 4,
        title: 'Сало ассорти',
        price: 210
      },
      {
        id: 5,
        title: 'Суджук',
        price: 180
      }];
      
      return allItems;

    }).then(allItems => console.log(allItems))
    .catch(error => console.log(error))
  )
}

export const gg = new Promise((resolve, reject) => {
  const connection = 'gg';
  resolve(connection);
})

