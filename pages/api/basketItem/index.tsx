import { prepareConnection } from 'src/db';
import { BasketItem } from 'src/models';
import { BasketItem as BasketItemEntity } from 'src/entity/BasketItem';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiProps {
  basketItem: BasketItem[]
}

export async function getServerSideProps() {
  try {
    const connection = await prepareConnection();
    const basketItemRepository = connection.getRepository(BasketItemEntity);
    const basketItems = await basketItemRepository.find();

    return {
      props: {
        basketItems: basketItems
      }
    }
  }
  catch(error) {
    console.log(error);
  }
}

const gg = [{ id: 1, title: 'nedoprogrammist'}]

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse, 
  basketItem: ApiProps
) {
  res.status(200).json(gg);
}