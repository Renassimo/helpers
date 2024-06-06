import GamesService from '@/gameMaps/services/games';

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
        query.gameId as string,
        body.data.attributes
      );

      res.status(200).json({ data });
    } else if (method === DELETE) {
      await gamesService.delete(uid, query.gameId as string);

      res.status(204).json({});
    }
  } catch (error: any) {
    res.status(500).json(getError(500, error?.message));
  }
};

export default handler;
