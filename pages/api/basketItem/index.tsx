import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    const connection = await prepareConnection();
    const basketItemRepository = connection.getRepository(BasketItemEntity);
    const basketItems = await basketItemRepository.find();
    res.status(200).json(basketItems);
  } else if (req.method == 'POST') {
    const item = req.body;
    const connection = await prepareConnection();
    const basketItemRepository = connection.getRepository(BasketItemEntity);
    const basketItems = await basketItemRepository.save({ item });
    res.status(201).json(basketItems);
  }
};

export default handler;
