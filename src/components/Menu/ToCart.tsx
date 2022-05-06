import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { useEffect, useState } from 'react';
import { useAppContext } from 'src/context/state';
import { Item } from 'src/models/index';
import styles from 'styles/menu.module.css';

interface ToCartProps {
  item: Item;
}

export default function ToCart({ item }: ToCartProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.toCart);
  const [buttonValue, setButtonValue] = useState('В корзину');
  // const {basketItems, setBasketItems} = useAppContext();
  const [basketItems, setBasketItems] = useState([]);

  const addToCartHandler = async () => {
    if (isClicked) return;

    setIsClicked(true);
    setButtonClass(styles.inCart);
    setButtonValue('В корзине');

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

    // return setBasketItems([...basketItems, item]);
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
