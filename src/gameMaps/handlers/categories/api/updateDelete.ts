import CategoriesService from '@/gameMaps/services/categories';
import ItemsService from '@/gameMaps/services/items';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

const PATCH = 'PATCH';
const DELETE = 'DELETE';

const allowedMethods = [PATCH, DELETE];

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  const { uid, body, query, method, db } = req;
  const gameId = query.gameId as string;
  const categoryId = query.categoryId as string;

  if (!allowedMethods.includes(method as string))
    res.status(405).json(getError(405));

  const categoriesService = CategoriesService.getInstance(db);

  try {
    if (method === PATCH) {
      const data = await categoriesService.update(
        uid,
        gameId,
        categoryId,
        body.data.attributes
      );

      res.status(200).json({ data });
    } else if (method === DELETE) {
      const itemsService = ItemsService.getInstance(db);

      const categoryItems = await itemsService.getAllByCategory(
        uid,
        gameId,
        categoryId
      );
      await Promise.all(
        categoryItems.map((item) => itemsService.delete(uid, gameId, item.id))
      );
      await categoriesService.delete(uid, gameId, categoryId);

      res.status(204).json({});
    }
  } catch (error: any) {
    res.status(500).json(getError(500, error?.message));
  }
};

export default handler;
