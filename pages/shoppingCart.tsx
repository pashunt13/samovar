import Layout from '../src/components/layout';
import styles from '../styles/shoppingCart.module.css';
import ItemsList from '../src/components/ShoppingCart/ItemsList';
import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import { BasketItem } from 'src/models';
import { instanceToPlain } from 'class-transformer';

interface ShoppingCartProps {
  items: BasketItem[];
}

export async function getServerSideProps() {
  try {
    const connection = await prepareConnection();
    const items = await connection
      .getRepository(BasketItemEntity)
      .createQueryBuilder('BasketItem')
      .leftJoinAndSelect('BasketItem.item', 'Item')
      .getMany();
    return {
      props: {
        items: instanceToPlain<BasketItem[]>(items),
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function ShoppingCart({ items }: ShoppingCartProps) {
  return (
    <Layout>
      <div className={styles.container}>
        <ItemsList items={items} />
      </div>
    </Layout>
  );
}
