import { prepareConnection } from 'src/db';
import { BasketItem } from 'src/models';
import { getConnection } from 'typeorm';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiProps {
  basketItem: BasketItem
}

const handler = async (
  req: NextApiRequest, 
  res: NextApiResponse, 
) => {

  const {
    query: { item },
    method,
  } = req

  if (req.method == 'GET') {
    const connection = await prepareConnection();
    const basketItemRepository = connection.getRepository(BasketItemEntity);
    const basketItems = await basketItemRepository.find();
    res.status(200).json(basketItems);
  }
  else if (req.method == 'POST') {
    getConnection()
    .createQueryBuilder()
    .insert()
    .into(BasketItemEntity)
    .values([
      {id: 4, item: {}},
    ])
    .execute();
    res.status(200).json({ item: item });
  }
}

export default handler;