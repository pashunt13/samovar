import Layout from '../src/components/Layout';
import Head from 'next/head';
import styles from '../styles/shoppingCart.module.css';
import ItemsList from '../src/components/ShoppingCart/ItemsList';
import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import { BasketItem } from 'src/models';
import { instanceToPlain } from 'class-transformer';
import { withIronSessionSsr } from 'iron-session/next';
import { SESSION_OPTIONS } from 'src/consts';

interface ShoppingCartProps {
  items: BasketItem[];
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {
      const connection = await prepareConnection();
      const items = await connection
        .getRepository(BasketItemEntity)
        .createQueryBuilder('BasketItem')
        .leftJoinAndSelect('BasketItem.item', 'Item')
        .leftJoinAndSelect('BasketItem.user', 'User')
        .where('BasketItem.user = :id', { id: req.session.user.id })
        .getMany();
      return {
        props: {
          items: instanceToPlain<BasketItem[]>(items),
        },
      };
    } catch (error) {
      console.log(error);
    }
  },
  SESSION_OPTIONS
);

export default function ShoppingCart({ items }: ShoppingCartProps) {
  return (
    <Layout>
      <Head>
        <title>Корзина</title>
        <meta
          name="description"
          content="Вы можете заказать у нас понравившиеся блюда онлайн. Быстро и вкусно"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <ItemsList items={items} />
      </div>
    </Layout>
  );
}
