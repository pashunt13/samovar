import Image from 'next/image';
import Head from 'next/head';
import { instanceToPlain } from 'class-transformer';
import { prepareConnection } from 'src/db';
import { Item } from 'src/models';
import { Item as ItemEntity } from '../src/entity/Item';
import { Category as CategoryModel } from 'src/models';
import { Category as CategoryEntity } from '../src/entity/Category';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import { BasketItem } from 'src/models';
import Layout from '../src/components/Layout';
import ToCart from '../src/components/Menu/ToCart';
import Category from '../src/components/Menu/Category';
import styles from '../styles/menu.module.css';
import { withIronSessionSsr } from 'iron-session/next';
import { SESSION_OPTIONS } from 'src/consts';

interface MenuProps {
  items: Item[];
  categories: CategoryModel[];
  basketItems: BasketItem[];
}

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  try {
    const connection = await prepareConnection();
    const items = await connection.getRepository(ItemEntity).find();
    const categories = await connection.getRepository(CategoryEntity).find();
    const basketItems = await connection
      .getRepository(BasketItemEntity)
      .createQueryBuilder('BasketItem')
      .leftJoinAndSelect('BasketItem.item', 'Item')
      .leftJoinAndSelect('BasketItem.user', 'User')
      .where('BasketItem.user = :id', { id: req.session.user })
      .getMany();

    return {
      props: {
        items: instanceToPlain<Item[]>(items),
        categories: instanceToPlain<CategoryModel[]>(categories),
        basketItems: instanceToPlain<BasketItem[]>(basketItems),
      },
    };
  } catch (error) {
    console.log('ERRRRROOOOOORRRRR: ' + error);
  }
}, SESSION_OPTIONS);

export default function Menu({ items, basketItems, categories }: MenuProps) {
  return (
    <Layout>
      <Head>
        <title>Меню</title>
        <meta
          name="description"
          content="В кафе Самовар вы найдете широкий ассортмент блюд русской кухни и не только: от домашней картошки до уток в медовом соусе"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Меню</h1>
        <ul className={styles.categoryList}>
          {categories.map((category) => {
            return <Category category={category} key={category.id} />;
          })}
        </ul>
        <ul className={styles.grid}>
          {items.map((item) => {
            const itemImage = item.image
              ? item.image
              : '/images/kfcExample.png';
            return (
              <li className={styles.listItem} key={item.id}>
                <Image
                  priority
                  src={itemImage}
                  className={styles.menuImage}
                  height={250}
                  width={250}
                  alt="login"
                />

                <div className={styles.menuItem}>
                  <div className={styles.menuItemTitle}>{item.title}</div>
                  <div className={styles.menuItemPrice}>{item.price}р.</div>
                  <ToCart item={item} basketItems={basketItems} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
