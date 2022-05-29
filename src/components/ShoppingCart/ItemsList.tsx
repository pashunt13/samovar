import styles from 'styles/shoppingCart.module.css';
import Counter from './Counter';
import Image from 'next/image';
import { useState } from 'react';
import { BasketItem } from 'src/models';
import Order from './Order';
import { HEADERS } from 'src/consts';

interface ItemsListProps {
  items: BasketItem[];
}

const ItemsList = ({ items }: ItemsListProps) => {
  const [basketItems, setBasketItems] = useState(items);
  const [orderActive, setOrderActive] = useState(false);

  const defaultTotal = basketItems.reduce((previousValue, basketItem) => {
    return previousValue + basketItem.quantity * basketItem.item.price;
  }, 0);

  const [total, setTotal] = useState(defaultTotal);

  const updateTotal = (itemSum: number) => {
    const newTotal = total + itemSum;
    return setTotal(newTotal);
  };

  const handleRemove = async (id: number, itemSum: number) => {
    try {
      const response = await fetch('/api/basketItem/' + id, {
        method: 'DELETE',
        headers: HEADERS,
      });

      const newList = basketItems.filter((basketItem) => basketItem.id !== id);
      updateTotal(-itemSum);
      return setBasketItems(newList);
    } catch (error) {
      console.log(error);
    }
  };

  if (basketItems.length === 0) {
    return (
      <>
        <div className={styles.title}>Корзина</div>
        <Image
          priority
          src="/images/yourCartIsEmpty.png"
          className={styles.yourCartIsEmpty}
          height={260}
          width={410}
          alt="yourCartIsEmpty"
        />
      </>
    );
  }

  return (
    <>
      <div className={styles.title}>Корзина</div>
      {basketItems.map((basketItem) => (
        <li className={styles.listItem} key={basketItem.id}>
          <div className={styles.itemTitle}>{basketItem.item.title}</div>
          <Counter
            basketItem={basketItem}
            onRemove={handleRemove}
            updateTotal={updateTotal}
            key={basketItem.id}
          />
        </li>
      ))}
      <div className={styles.total}>
        <button className={styles.order} onClick={() => setOrderActive(true)}>
          Оформить заказ
        </button>
        <div className={styles.totalTitle}>Итого:</div>
        <div className={styles.totalValue}>{total}р.</div>
      </div>
      <Order
        active={orderActive}
        setActive={setOrderActive}
        basketItems={basketItems}
        setBasketItems={setBasketItems}
      />
    </>
  );
};

export default ItemsList;
