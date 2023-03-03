import { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { Item } from 'src/entity/Item';
import { In } from 'typeorm';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  let categoryFilter = (id as string).split(',');

  const connection = await prepareConnection();
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
  return res.json(items);
};

export default handler;
