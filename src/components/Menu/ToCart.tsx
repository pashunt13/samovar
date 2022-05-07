import { useState } from 'react';
import { Item } from 'src/models/index';
import styles from 'styles/menu.module.css';

interface ToCartProps {
  item: Item;
}

export default function ToCart({ item }: ToCartProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.toCart);
  const [buttonValue, setButtonValue] = useState('В корзину');

  const addToCartHandler = async () => {
    if (isClicked) return;
    try {
      const response = await fetch('/api/basketItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(item.id),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setIsClicked(true);
    setButtonClass(styles.inCart);
    setButtonValue('В корзине');
  };

  return (
    <input
      className={buttonClass}
      type="button"
      value={buttonValue}
      onClick={addToCartHandler}
    />
  );
}
