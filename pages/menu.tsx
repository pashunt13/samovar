import Image from 'next/image';
import { instanceToPlain } from 'class-transformer';
import { prepareConnection } from 'src/db';
import { Item } from 'src/models';
import { Item as ItemEntity } from '../src/entity/Item';
import Layout from '../src/components/layout';
import ToCart from '../src/components/Menu/ToCart';
import styles from '../styles/menu.module.css';

interface MenuProps {
  items: Item[];
}

export async function getServerSideProps() {
  try {
    const connection = await prepareConnection();
    const itemRepository = connection.getRepository(ItemEntity);
    const allItems = await itemRepository.find();

    return {
      props: {
        items: instanceToPlain<Item[]>(allItems),
      },
    };
  } catch (error) {
    console.log('ERRRRROOOOOORRRRR: ' + error);
  }
}

export default function Menu({ items }: MenuProps) {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Меню</h1>
        <ul className={styles.grid}>
          {items.map((item) => (
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
                <ToCart item={item} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
