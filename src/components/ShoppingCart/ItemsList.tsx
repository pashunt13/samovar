import styles from 'styles/shoppingCart.module.css';
import Counter from './Counter';
import Image from 'next/image';
import { useAppContext } from 'src/context/state';
import { useState, useCallback } from 'react';

interface ItemsListProps {
  totalCount: Function
}

const ItemsList = () => {

  const [total, setTotal] = useState(0);

  const totalCount = (itemSum: number) => {
    const newTotal = total + itemSum;
    return setTotal(newTotal);
  };

  const {basketItems, setBasketItems} = useAppContext();

  const handleRemove = (id: number) => {
    const newList = basketItems.filter((item) => item.id !== id);
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
      {basketItems.map((item) => (
        <li className={styles.listItem} key={item.id}>
          <div className={styles.itemTitle}>{item.title}</div>
          <Counter 
            item={item} 
            onRemove={handleRemove} 
            totalCount={totalCount} 
            key={item.id} 
          />
        </li>
      ))}
        <div className={styles.total}>
          <div className={styles.totalTitle}>Итого:</div>
          <div className={styles.totalValue}>{total}р.</div>
        </div>
    </>
  );
}

export default ItemsList;