import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { User as UserEntity } from 'src/entity/User';
import { SESSION_OPTIONS } from 'src/consts';

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await prepareConnection();
  const basketItemRepository = connection.getRepository(BasketItemEntity);
  const userRepository = connection.getRepository(UserEntity);

  if (!req.session.user) {
    const user = await userRepository.save({});
    req.session.user = user.id;
    await req.session.save();
  }

  const item = req.body;
  const quantity = 1;
  const basketItem = await basketItemRepository.save({
    item,
    quantity,
    user: req.session.user,
  });
  res.status(201).json(basketItem);
},
SESSION_OPTIONS);
