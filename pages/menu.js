import Layout from "../components/layout"
import styles from "../styles/menu.module.css"
import Image from "next/image"

export default function Menu() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Меню</h1>
        <ul className={styles.grid}>
          <li className={styles.listItem}>
            <Image 
              priority
              src="/images/amerikano.png"
              className={styles.menuImage}
              height={250}
              width={250}
              alt="login"
            />

            <div className={styles.menuItem}>
              <div className={styles.menuItemTitle}>Кофе</div>
              <div className={styles.menuItemPrice}>100р.</div>

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
        </ul>
      </div>
    </Layout>
  )
} 