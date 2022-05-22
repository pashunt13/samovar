import styles from 'styles/order.module.css';
import ReactInputMask from 'react-input-mask';
import { useState } from 'react';
import { BasketItem } from 'src/models';

interface OrderProps {
  active: boolean;
  setActive: Function;
  basketItems: BasketItem[];
  setBasketItems: Function;
}

const Order = ({
  active,
  setActive,
  basketItems,
  setBasketItems,
}: OrderProps) => {
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const confirmOrder = async () => {
    if (!isChecked)
      return alert('Нужно ваше согласие на обработку ваших данных');
    if (!tel) return alert('Вы забыли оставить нам свой номер');
    if (tel.includes('_')) return alert('Нам не хватает цифр в номере');

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ tel, email }),
      });

      setBasketItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={active ? styles.modalActive : styles.modal}
      onClick={() => setActive(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>Оформление заказа</div>
        <div className={styles.subTitle}>Данные покупателя:</div>
        <div className={styles.grid}>
          <ReactInputMask
            className={styles.input}
            placeholder="Телефон"
            mask="+7 (999) 999-99-99"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <ReactInputMask
            className={styles.input}
            placeholder="Email"
            mask=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.text}>
          Выдача заказов по адресу: ул. Портовая 66а.
        </div>
        <div className={styles.text}>
          По всем вопросам звоните по тел: 240-35-68.
        </div>
        <div className={styles.grid}>
          <div className={styles.agreement}>
            <input
              type="checkbox"
              id="agreement"
              onClick={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="agreement">
              Я соглашаюсь с обработкой персональных данных
            </label>
          </div>
          <button className={styles.confirm} onClick={confirmOrder}>
            Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
