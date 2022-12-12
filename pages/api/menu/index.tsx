import { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { Item } from 'src/entity/Item';
import { In } from 'typeorm';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const categoryFilter = req.body;
  const connection = await prepareConnection();

  if (categoryFilter.length === 0) {
    const items = await connection.getRepository(Item).find();
    return res.status(200).json(items);
  }

  const items = await connection.getRepository(Item).find({
    relations: {
      category: true,
    },
    where: {
      category: {
        id: In(categoryFilter),
      },
    },
  });
  return res.status(200).json(items);
};

export default handler;
