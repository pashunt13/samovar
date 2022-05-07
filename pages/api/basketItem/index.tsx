import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await prepareConnection();
  const basketItemRepository = connection.getRepository(BasketItemEntity);

  if (req.method == 'GET') {
    // const basketItems = await basketItemRepository.find({
    //   relations: {
    //     item: true,
    //   },
    // });
    const basketItems = await connection
      .getRepository(BasketItemEntity)
      .createQueryBuilder('BasketItem')
      .leftJoinAndSelect('BasketItem.item', 'Item')
      .getMany();
    res.status(200).json(basketItems);
  } else if (req.method == 'POST') {
    const item = req.body;
    const basketItems = await basketItemRepository.save({ item });
    res.status(201).json(basketItems);
  }
};

export default handler;
