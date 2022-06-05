import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import { User as UserEntity } from 'src/entity/User';
import { Order as OrderEntity } from 'src/entity/Order';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BasketItem } from 'src/models';
import { withIronSessionApiRoute } from 'iron-session/next';
import { SESSION_OPTIONS } from 'src/consts';

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await prepareConnection();
  const basketItemRepository = connection.getRepository(BasketItemEntity);
  const userRepository = connection.getRepository(UserEntity);
  const orderRepository = connection.getRepository(OrderEntity);

  if (req.method == 'POST') {
    const basketItems = await connection.getRepository(BasketItemEntity).find({
      relations: {
        item: true,
        user: true,
      },
      where: {
        id: req.session.user,
      },
    });

    const { tel, email } = req.body;
    const user = await userRepository.save({
      id: req.session.user,
      tel,
      email,
    });

    const order = await orderRepository.save({
      date: new Date(),
      user: user.id,
      orderedItems: basketItems.map((basketItem: BasketItem) => {
        return {
          item: basketItem.item,
          quantity: basketItem.quantity,
        };
      }),
    });

    const clearBasketItems = await basketItemRepository.delete({
      user: req.session.user,
    });
    res.status(201).json(clearBasketItems);
  } else if (req.method == 'PUT') {
    const order = await orderRepository.save({
      id: req.body.id,
      status: req.body.status,
    });
    res.status(201).json(order);
  }
},
SESSION_OPTIONS);
