import { prepareConnection } from 'src/db';
import { Order as OrderEntity } from 'src/entity/Order';
import { Order } from 'src/models';
import styles from 'styles/admin.module.css';
import { instanceToPlain } from 'class-transformer';
import Link from 'next/link';
import Head from 'next/head';

interface OrdersProps {
  orders: Order[];
}

export async function getServerSideProps() {
  const connection = await prepareConnection();
  const orders = await connection
    .getRepository(OrderEntity)
    .createQueryBuilder('Order')
    .leftJoinAndSelect('Order.user', 'User')
    .orderBy('Order.id')
    .getMany();
  return {
    props: {
      orders: instanceToPlain<Order[]>(orders),
    },
  };
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <>
      <Head>
        <title>Заказы</title>
        <meta name="description" content="Просмотр всех заказов" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.title}>Заказы</div>
        <div className={styles.listTitles}>
          <div className={styles.listTitle}>Номер</div>
          <div className={styles.listTitle}>Дата</div>
          <div className={styles.listTitle}>Телефон клиента</div>
          <div className={styles.listTitle}>Email клиента</div>
          <div className={styles.listTitle}>Статус</div>
        </div>
        {orders.map((order) => {
          const orderStatus = order.status ? 'Завершен' : 'Открыт';
          const orderStatusColor = order.status
            ? styles.closedOrder
            : styles.openedOrder;
          return (
            <div className={styles.listItem} key={order.id}>
              <Link href={'/admin/' + order.id}>
                <a>
                  <div className={styles.text}>{order.id}</div>
                  <div className={styles.text}>{order.date}</div>
                  <div className={styles.text}>{order.user.tel}</div>
                  <div className={styles.text}>{order.user.email}</div>
                  <div className={orderStatusColor}>{orderStatus}</div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
