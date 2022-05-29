import { useState } from 'react';
import { HEADERS } from 'src/consts';
import { Item } from 'src/models';
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
        headers: HEADERS,
        body: JSON.stringify(item.id),
      });
      const data = await response.json();

      setIsClicked(true);
      setButtonClass(styles.inCart);
      setButtonValue('В корзине');
    } catch (error) {
      console.log(error);
    }
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
