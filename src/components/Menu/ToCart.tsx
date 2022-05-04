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

  useEffect(() => {
    // const requestOptions = {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //   body: JSON.stringify({ item })
    // };
    fetch('http://localhost:3000/basketItem/')
      .then(res => res.json())
      .then(result => JSON.stringify(result))
  })

  function addToCartHandler() {
    if (isClicked) return;

    setIsClicked(true);
    setButtonClass(styles.inCart);
    setButtonValue('В корзине');

    // return setBasketItems([...basketItems, item]);
  }

  return (
    <input
      className={buttonClass}
      type="button"
      value={buttonValue}
      onClick={addToCartHandler}
    />
  );
}