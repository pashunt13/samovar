import type { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await prepareConnection();
  const basketItemRepository = connection.getRepository(BasketItemEntity);

  if (req.method == 'PUT') {
    const query = req.query;
    const quantity = req.body;
    const basketItem = basketItemRepository.save({
      id: Number(query.id),
      quantity: quantity,
    });
    res.status(201).json(basketItem);
  } else if (req.method == 'DELETE') {
    const query = req.query;
    const basketItem = await basketItemRepository.delete({
      id: Number(query.id),
    });
    res.status(201).json(basketItem);
  }
};

export default handler;
