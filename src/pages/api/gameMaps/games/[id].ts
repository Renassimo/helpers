import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import GamesService from '@/gameMaps/services/games/GamesService';

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

  if (!allowedMethods.includes(method as string))
    res.status(405).json(getError(405));

  const gamesService = GamesService.getInstance(db);

  try {
    if (method === PATCH) {
      const data = await gamesService.update(
        uid,
        query.id as string,
        body.data.attributes
      );

      res.status(200).json(data);
    } else if (method === DELETE) {
      await gamesService.delete(uid, query.id as string);

      res.status(204).json({});
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json(getError(500, error?.message));
  }
};

export default withAuthApi(handler, getFirestore());
