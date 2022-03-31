import { useState } from 'react';
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
  const {basketItems, setBasketItems} = useAppContext();

  function addToCartHandler() {
    if (isClicked) return;

    setIsClicked(true);
    setButtonClass(styles.inCart);
    setButtonValue('В корзине');

    return setBasketItems([...basketItems, item]);
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