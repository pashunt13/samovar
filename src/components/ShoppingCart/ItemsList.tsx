import styles from 'styles/shoppingCart.module.css';
import Counter from './Counter';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BasketItem } from 'src/models';

interface ItemsListProps {
  items: BasketItem[];
}

const ItemsList = ({ items }: ItemsListProps) => {
  const [basketItems, setBasketItems] = useState(items);

  const [total, setTotal] = useState(0);

  const totalCount = (itemSum: number) => {
    const newTotal = total + itemSum;
    console.log(newTotal);
    return setTotal(newTotal);
  };

  // useEffect(() => {
  //   const totalCount = (itemSum: number) => {
  //     const newTotal = total + itemSum;
  //     console.log(newTotal);
  //     return setTotal(newTotal);
  //   };
  // })

  // useEffect(() => {
  //   const dataFetch = async () => {
  //     try {
  //       const response = await fetch('/api/basketItem');
  //       const data = await response.json();
  //       console.log(data);
  //       setBasketItems(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   dataFetch();
  // }, []);

  const handleRemove = (id: number) => {
    const newList = basketItems.filter((basketItem) => basketItem.id !== id);
    return setBasketItems(newList);
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
            totalCount={totalCount}
            key={basketItem.id}
          />
        </li>
      ))}
      <div className={styles.total}>
        <div className={styles.totalTitle}>Итого:</div>
        <div className={styles.totalValue}>{total}р.</div>
      </div>
    </>
  );
};

export default ItemsList;
