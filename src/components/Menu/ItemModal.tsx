import { Item } from 'src/models';
import Image from 'next/image';
import styles from 'styles/menu.module.css';

interface ItemModalProps {
  active: boolean;
  setActive: Function;
  item: Item;
}

const ItemModal = ({ active, setActive, item }: ItemModalProps) => {
  console.log('gg');
  return (
    <div
      className={active ? styles.modalActive : styles.modal}
      onClick={() => setActive(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>{item.title}</div>
        {/* <Image
          priority
          src={item.image}
          className={styles.menuImage}
          height={250}
          width={250}
          alt={item.title}
        /> */}
        {/* <div className={styles.modalSubTitle}>Данные покупателя:</div> */}
        <div className={styles.modalGrid}></div>
      </div>
    </div>
  );
};

export default ItemModal;
