import { prepareConnection } from 'src/db';
import { Order as OrderEntity } from 'src/entity/Order';
import { OrderedItem } from 'src/models';
import { Order } from 'src/models';
import { instanceToPlain } from 'class-transformer';
import styles from 'styles/admin.module.css';
import { useState } from 'react';
import { HEADERS, SESSION_OPTIONS } from 'src/consts';
import { withIronSessionSsr } from 'iron-session/next';
import Head from 'next/head';

interface OrderedItemProps {
  orderedItems: OrderedItem[];
  orderId: number;
  order: Order;
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  query,
}) {
  if (!req.session.authorized) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const orderId = query.id;
  const connection = await prepareConnection();
  const order = await connection.getRepository(OrderEntity).findOne({
    relations: {
      orderedItems: {
        item: true,
      },
    },
    where: {
      id: Number(orderId),
    },
  });

  return {
    props: {
      order: instanceToPlain<Order>(order),
    },
  };
},
SESSION_OPTIONS);

const OrderedItems = ({ order }: OrderedItemProps) => {
  const [orderStatus, setOrderStatus] = useState(order.status);

  const initialButtonClass = orderStatus
    ? styles.closedOrderButton
    : styles.openedOrderButton;
  const [buttonClass, setButtonClass] = useState(initialButtonClass);

  const initialButtonValue = orderStatus ? 'Заказ закрыт' : 'Закрыть заказ';
  const [buttonValue, setButtonValue] = useState(initialButtonValue);

  const closeOrderHandler = async () => {
    if (orderStatus) {
      return;
    }
    try {
      await fetch('/api/order', {
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

  const total = order.orderedItems.reduce((previousValue, orderedItem) => {
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
        {order.orderedItems.map((orderedItem) => (
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
          <button className={buttonClass} onClick={closeOrderHandler}>
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
