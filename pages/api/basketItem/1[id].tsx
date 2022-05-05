import type { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'src/db';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import { BasketItem } from 'src/models';
import { getConnection } from 'typeorm';

interface ApiProps {
  basketItem: BasketItem[]
}

export default function basketItemHandler(
  req: NextApiRequest, 
  res: NextApiResponse,
  basketItem: ApiProps
) {
  const {
    query: { id, item, quantity },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ basketItem: basketItem })
      break
    case 'PUT':
      // Update or create data in your database

      getConnection()
      .createQueryBuilder()
      .insert()
      .into(BasketItemEntity)
      .values([
        { id: 1, item: {}, quantity: 3,  },
      ])
      .execute()

      res.status(200).json({ basketItem: basketItem })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}