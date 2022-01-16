import Layout from "../components/layout"
import styles from "../styles/menu.module.css"
import Image from "next/image"
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Items } from "../src/entity/Item";


export async function getStaticProps() {
  const allItems = await createConnection().then(async connection => {
    let item = new Items();
    let itemRepository = connection.getRepository(Items);

    let allItems = await itemRepository.find();
    console.log("All items from the db: ", allItems);
    return allItems;
  }).catch(error => console.log('ERRRROOOORRRRR:' + error));

  console.log('\nallItems in  getStaticProps(): ' + allItems + '\n');
  return {
    props: {
      allItems
    }
  }
}


export default function Menu({ allItems }) {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Меню</h1>
        <ul className={styles.grid}>
        {console.log('allItems in  Menu component: ' + allItems)}
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