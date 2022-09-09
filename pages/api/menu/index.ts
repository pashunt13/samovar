import { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { Item } from 'src/entity/Item';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await prepareConnection();
  const items = await connection.getRepository(Item).find();
  return res.json(items);
}

export default handler;