import Layout from "../components/layout"
import styles from "../styles/menu.module.css"
import Image from "next/image"

import { createConnection } from "typeorm";
import { Item } from "../src/entity/Item";
import { prepareConnection } from "src/db";



export async function getStaticProps() {
  try {
    const connection = await createConnection({
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
    const item = new Item();
    const itemRepository = connection.getRepository(Item);
    const data = await itemRepository.find();
    const allItems = JSON.parse(JSON.stringify(data));
    
    connection.close();

    console.log('\nallItems in  getStaticProps(): ' + allItems + '\n');
    return {
      props: {
        allItems
      }
    }
  } catch (error) {
     console.log('ERRRRROOOOOORRRRR: ' + error); 
  }
}

export default function Menu({ allItems }) {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Меню</h1>
        <ul className={styles.grid}>
          {allItems.map((item) => (
            <li className={styles.listItem} key={item.id}>
              <Image 
                priority
                src="/images/no_image.png"
                className={styles.menuImage}
                height={250}
                width={250}
                alt="login"
              />

              <div className={styles.menuItem}>
                <div className={styles.menuItemTitle}>{item.title}</div>
                <div className={styles.menuItemPrice}>{item.price}р.</div>

                {/* <input
                  className={styles.menuItemQuantity} 
                  type="number"
                  min={1}
                  max={99} 
                />
                <div className={styles.unit}>шт.</div> */}

                <input 
                  className={styles.inCart} 
                  type="button"
                  value={'В корзину'}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}