import CategoriesService from '@/gameMaps/services/categories';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { uid, query, body, db } = req;
      const gameId = query.gameId as string;

      const categoriesService = CategoriesService.getInstance(db);
      const data = await categoriesService.create(
        uid,
        gameId,
        body.data.attributes
      );

      res.status(201).json({ data });
    } catch (error: any) {
      res.status(500).json(getError(500, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default handler;
