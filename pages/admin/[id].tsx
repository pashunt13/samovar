import type { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { OrderedItem as OrderedItemEntity } from 'src/entity/OrderedItem';
import { Order as OrderEntity } from 'src/entity/Order';
import { OrderedItem } from 'src/models';
import { Order } from 'src/models';
import { instanceToPlain } from 'class-transformer';
import styles from 'styles/admin.module.css';
import { useState } from 'react';
import { HEADERS } from 'src/consts';
import Head from 'next/head';

interface OrderedItemProps {
  orderedItems: OrderedItem[];
  orderId: number;
  order: Order;
}

export async function getServerSideProps(req: NextApiRequest) {
  const orderId = req.query.id;
  const connection = await prepareConnection();
  const order = await connection
    .getRepository(OrderEntity)
    .createQueryBuilder('Order')
    .where('Order.id = :id', { id: orderId })
    .getOne();

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
      order: instanceToPlain<Order>(order),
    },
  };
}

const OrderedItems = ({ orderedItems, order }: OrderedItemProps) => {
  const [orderStatus, setOrderStatus] = useState(order.status);

  const initialButtonClass = orderStatus
    ? styles.closedOrderButton
    : styles.openedOrderButton;
  const [buttonClass, setButtonClass] = useState(initialButtonClass);

  const initialButtonValue = orderStatus ? 'Заказ закрыт' : 'Закрыть заказ';
  const [buttonValue, setButtonValue] = useState(initialButtonValue);

  const handler = async () => {
    if (orderStatus) {
      return;
    }
    try {
      const response = await fetch('/api/order', {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({ id: order.id, status: !orderStatus }),
      });
      setOrderStatus(true);
      setButtonClass(styles.closedOrderButton);
      setButtonValue('Заказ закрыт');
    } catch (error) {
      console.log(error);
    }
  };

  const total = orderedItems.reduce((previousValue, orderedItem) => {
    return previousValue + orderedItem.quantity * orderedItem.item.price;
  }, 0);

  return (
    <>
      <Head>
        <title>Заказ №{order.id}</title>
        <meta name="description" content={`Просмотр заказа №${order.id}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.title}>Заказ №{order.id}</div>
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
        <div className={styles.total}>
          <button className={buttonClass} onClick={handler}>
            {buttonValue}
          </button>
          <div className={styles.totalTitle}>Итого:</div>
          <div className={styles.totalValue}>{total}р.</div>
        </div>
      </div>
    </>
  );
};

export default OrderedItems;
