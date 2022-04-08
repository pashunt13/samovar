import Layout from '../src/components/layout';
import styles from '../styles/shoppingCart.module.css';
import ItemsList from '../src/components/ShoppingCart/ItemsList';

export default function ShoppingCart() {
  return (
    <Layout>
      <div className={styles.container}>
        <ItemsList />
      </div>
    </Layout>
  )
}