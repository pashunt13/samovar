import type { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await prepareConnection();
  const basketItemRepository = connection.getRepository(BasketItemEntity);

  if (req.method == 'GET') {
    const basketItems = await connection
      .getRepository(BasketItemEntity)
      .createQueryBuilder('BasketItem')
      .leftJoinAndSelect('BasketItem.item', 'Item')
      .getMany();
    res.status(200).json(basketItems);
  } else if (req.method == 'PUT') {
    const query = req.query;
    const quantity = req.body;
    basketItemRepository.save({ id: Number(query.id), quantity: quantity });
    res.status(201).json('');
  }
};

export default handler;
