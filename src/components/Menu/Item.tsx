import ToCart from './ToCart';
import ItemModal from './ItemModal';
import Image from 'next/image';
import styles from 'styles/menu.module.css';
import { Item as ItemModel } from 'src/models';
import { BasketItem } from 'src/models';
import { useState } from 'react';

interface ItemProps {
  item: ItemModel;
  basketItems: BasketItem[];
}

const Item = ({ item, basketItems }: ItemProps) => {
  item.image = item.image ? item.image : '/images/kfcExample.png';
  const [modalActive, setModalActive] = useState(false);
  return (
    <li className={styles.listItem} key={item.id}>
      <Image
        priority
        src={item.image}
        className={styles.menuImage}
        height={250}
        width={250}
        alt={item.title}
      />

      <div className={styles.menuItem}>
        <button
          className={styles.menuItemTitle}
          onClick={() => setModalActive(true)}
        >
          {item.title}
        </button>
        <div className={styles.menuItemPrice}>{item.price}p.</div>
        <ToCart item={item} basketItems={basketItems} />
      </div>
      <ItemModal active={modalActive} setActive={setModalActive} item={item} />
    </li>
  );
};

export default Item;
