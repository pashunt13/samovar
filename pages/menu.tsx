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
import CategoryList from '../src/components/Menu/CategoryList';
import styles from '../styles/menu.module.css';
import { withIronSessionSsr } from 'iron-session/next';
import { SESSION_OPTIONS } from 'src/consts';
import { useState } from 'react';

interface MenuProps {
  allItems: Item[];
  categories: CategoryModel[];
  basketItems: BasketItem[];
}

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  try {
    const connection = await prepareConnection();
    const allItems = await connection.getRepository(ItemEntity).find();
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
        allItems: instanceToPlain<Item[]>(allItems),
        categories: instanceToPlain<CategoryModel[]>(categories),
        basketItems: instanceToPlain<BasketItem[]>(basketItems),
      },
    };
  } catch (error) {
    console.log('ERRRRROOOOOORRRRR: ' + error);
  }
}, SESSION_OPTIONS);

export default function Menu({ allItems, basketItems, categories }: MenuProps) {
  const [items, setItems] = useState(allItems);

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
        <CategoryList categoryList={categories} setItems={setItems} />
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
