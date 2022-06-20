import { useState } from 'react';
import { HEADERS } from 'src/consts';
import { Item } from 'src/models';
import { BasketItem } from 'src/models';
import styles from 'styles/menu.module.css';

interface ToCartProps {
  item: Item;
  basketItems: BasketItem[];
}

export default function ToCart({ item, basketItems }: ToCartProps) {
  const isInCart = basketItems.find(
    (basketItem) => basketItem.item.id == item.id
  );

  const [isClicked, setIsClicked] = useState(isInCart ? true : false);
  const [buttonClass, setButtonClass] = useState(
    isInCart ? styles.inCart : styles.toCart
  );
  const [buttonValue, setButtonValue] = useState(
    isInCart ? 'В корзине' : 'В корзину'
  );

  const addToCartHandler = async () => {
    if (isClicked) return;
    try {
      const response = await fetch('/api/basketItem', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(item.id),
      });

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
