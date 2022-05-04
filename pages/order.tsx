import styles from 'styles/order.module.css';
import ReactInputMask from 'react-input-mask';

interface OrderProps {
  active: boolean;
  setActive: Function;
}

const Order = ({ active, setActive }: OrderProps) => {
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
          />
          <ReactInputMask
            className={styles.input}
            placeholder="Email"
            mask=""
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
            <input type="checkbox" id="agreement" />
            <label htmlFor="agreement">
              Я соглашаюсь с обработкой персональных данных
            </label>
          </div>
          <button className={styles.submit}>Подтвердить заказ</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
