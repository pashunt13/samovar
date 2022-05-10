import styles from 'styles/shoppingCart.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BasketItem } from 'src/models';

const MIN_ITEMS = 1;
const MAX_ITEMS = 9;

interface CounterProps {
  basketItem: BasketItem;
  onRemove: Function;
  totalCount: Function;
}

const Counter = ({ basketItem, onRemove, totalCount }: CounterProps) => {
  const [counter, setCounter] = useState(basketItem.quantity);
  const itemSum = basketItem.item.price * counter;
  // totalCount(itemSum);

  const decrease = async () => {
    if (counter == MIN_ITEMS) return;
    try {
      const response = await fetch('/api/basketItem/' + basketItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(counter - 1),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
    setCounter(counter - 1);
    totalCount(-itemSum);
  };

  const increase = async () => {
    if (counter == MAX_ITEMS) return;
    try {
      const response = await fetch('/api/basketItem/' + basketItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(counter + 1),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
    setCounter(counter + 1);
    totalCount(itemSum);
  };

  // useEffect(() => {
  //   const dataFetch = async (quantity: number) => {
  //     try {
  //       const response = await fetch('/api/basketItem/'+ basketItem.id, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //         body: JSON.stringify(quantity),
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // })

  return (
    <div className={styles.rightPosition}>
      <div className={styles.cartCounter}>
        <button className={styles.counter} onClick={decrease}>
          -
        </button>
        <input className={styles.counter} type="text" value={counter} />
        <button className={styles.counter} onClick={increase}>
          +
        </button>
      </div>
      <div className={styles.price}>{itemSum}р.</div>
      <Image
        priority
        src="/images/removeButton.png"
        className={styles.removeButton}
        height={36}
        width={36}
        alt="removeButton"
        onClick={() => onRemove(basketItem.id)}
      />
    </div>
  );
};

export default Counter;
