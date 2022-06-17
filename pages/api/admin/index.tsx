import { prepareConnection } from 'src/db';
import { User as UserEntity } from 'src/entity/User';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await prepareConnection();
  const user = await connection.getRepository(UserEntity).find({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });
  // console.log(user);
  if (user.length !== 0) return res.status(201).json(true);
  res.status(404).json(false);
};

export default handler;
