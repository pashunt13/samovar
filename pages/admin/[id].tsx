import { useRouter } from 'next/router';
import { prepareConnection } from 'src/db';
import { OrderedItem as OrderedItemEntity } from 'src/entity/OrderedItem';
import { OrderedItem } from 'src/models';
import { instanceToPlain } from 'class-transformer';
import styles from 'styles/admin.module.css';

interface OrderedItemProps {
  orderedItems: OrderedItem[];
}

function Router() {
  const router = useRouter();
  const orderId = router.query.id;
  console.log(orderId);
  return orderId;
}

export async function getServerSideProps() {
  const orderId = Router();
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
    },
  };
}

const OrderedItems = ({ orderedItems }: OrderedItemProps) => {
  // const connection = await prepareConnection();
  // const orderedItems = await connection
  //   .getRepository(OrderedItemEntity)
  //   .createQueryBuilder('OrderedItem')
  //   .leftJoinAndSelect('OrderedItem.item', 'Item')
  //   .leftJoinAndSelect('OrderedItem.order', 'Order')
  //   .where('OrderedItem.order = :order', { order: orderId })
  //   .getMany();

  return (
    <>
      {orderedItems.map((orderedItem) => (
        <div className={styles.listItem} key={orderedItem.id}>
          <input className={styles.text} value={orderedItem.item.title} />
          <input className={styles.text} value={orderedItem.quantity} />
        </div>
      ))}
    </>
  );
};

export default OrderedItems;
