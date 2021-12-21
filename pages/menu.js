import Layout from "../components/layout"
import styles from "../styles/menu.module.css"
import Image from "next/image"
import { getItemsData } from "../src/db.ts"
// import { connection } from "../src/db.ts"


export async function getStaticProps() {
  // чинило ошибку с json, но в итоге появилась другая
  // const items = getItemsData()
  // const allItems = JSON.stringify(items)
  const allItems = getItemsData();
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
          {allItems.map((item) => (
            <li className={styles.listItem} key={item.id}>
              <Image 
                priority
                src="/images/amerikano.png"
                className={styles.menuImage}
                height={250}
                width={250}
                alt="login"
              />

              <div className={styles.menuItem}>
                <div className={styles.menuItemTitle}>{item.title}</div>
                <div className={styles.menuItemPrice}>{item.price}р.</div>

                <input
                  className={styles.menuItemQuantity} 
                  type="number"
                  min={1}
                  max={99} 
                />
                <div className={styles.unit}>шт.</div>

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