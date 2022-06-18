import { prepareConnection } from 'src/db';
import { User as UserEntity } from 'src/entity/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { SESSION_OPTIONS } from 'src/consts';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await prepareConnection();
  const user = await connection.getRepository(UserEntity).findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });

  if (user) {
    req.session.user = {
      id: user.id,
      authorized: true,
    };
    await req.session.save();
    res.status(200).json(true);
  } else {
    res.status(403).json(false);
  }
},
SESSION_OPTIONS);
