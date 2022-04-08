import styles from 'styles/shoppingCart.module.css';
import Image from 'next/image';
import { useState } from 'react'
import { BasketItem } from 'src/models';

const MIN_ITEMS = 1;
const MAX_ITEMS = 99;

interface CounterProps {
  item: BasketItem,
  onRemove: Function,
  totalCount: Function
}

const Counter = ({ item,  onRemove, totalCount }: CounterProps ) => {
  const [counter, setCounter] = useState(1);
  const itemSum = item.price * counter;

  const decrease = () => {
    if (counter == MIN_ITEMS) return;
    setCounter(counter - 1);
    totalCount(-itemSum);
  }
  
  const increase = () => {
    if (counter == MAX_ITEMS) return;
    setCounter(counter + 1);
    totalCount(itemSum);
  }
  
  return (
    <div className={styles.rightPosition}>
      <div className={styles.cartCounter}>
        <button className={styles.counter} onClick={decrease}>-</button>
        <input className={styles.counter} type="text" value={counter} />
        <button className={styles.counter} onClick={increase}>+</button>
      </div>
      <div className={styles.price}>{itemSum}р.</div>
        <Image
          priority
          src="/images/removeButton.png"
          className={styles.removeButton}
          height={36}
          width={36}
          alt="removeButton"
          onClick={() => onRemove(item.id)}
        />
    </div>
  )
}

export default Counter;