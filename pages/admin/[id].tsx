import type { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { OrderedItem as OrderedItemEntity } from 'src/entity/OrderedItem';
import { OrderedItem } from 'src/models';
import { instanceToPlain } from 'class-transformer';
import styles from 'styles/admin.module.css';

interface OrderedItemProps {
  orderedItems: OrderedItem[];
  orderId: number;
}

export async function getServerSideProps(req: NextApiRequest) {
  const orderId = req.query.id;
  const connection = await prepareConnection();
  const orderedItems = await connection
    .getRepository(OrderedItemEntity)
    .createQueryBuilder('OrderedItem')
    .leftJoinAndSelect('OrderedItem.item', 'Item')
    .leftJoinAndSelect('OrderedItem.order', 'Order')
    .where('OrderedItem.order = :order', { order: orderId })
    .getMany();
  return {
    props: {
      orderedItems: instanceToPlain<OrderedItem[]>(orderedItems),
      orderId: orderId,
    },
  };
}

const OrderedItems = ({ orderedItems, orderId }: OrderedItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Заказ: {orderId}</div>
      <div className={styles.listTitles}>
        <div className={styles.listTitle}>Наименование</div>
        <div className={styles.listTitle}>Цена</div>
        <div className={styles.listTitle}>Количество</div>
        <div className={styles.listTitle}>Стоимость</div>
      </div>
      {orderedItems.map((orderedItem) => (
        <div className={styles.listItem} key={orderedItem.id}>
          <div className={styles.text}>{orderedItem.item.title}</div>
          <div className={styles.text}>{orderedItem.item.price}</div>
          <div className={styles.text}>{orderedItem.quantity}</div>
          <div className={styles.text}>
            {orderedItem.item.price * orderedItem.quantity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderedItems;
