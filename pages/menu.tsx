import Layout from "../components/layout"
import styles from "../styles/menu.module.css"
import Image from "next/image"
import { Item } from "../src/entity/Item";
import { instanceToPlain } from 'class-transformer';
import { prepareConnection } from 'src/db'

export async function getServerSideProps() {
  try {
    
    const connection = await prepareConnection();
    const item = new Item();
    const itemRepository = connection.getRepository(Item);
    const allItems = await itemRepository.find();

    console.log('\nallItems in  getStaticProps(): ', allItems, '\n');
    return {
      props: {
        allItems: instanceToPlain(allItems)
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