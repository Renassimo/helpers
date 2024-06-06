import PlaysService from '@/gameMaps/services/plays';
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
  const playId = query.playId as string;

  if (!allowedMethods.includes(method as string))
    res.status(405).json(getError(405));

  const playsService = PlaysService.getInstance(db);

  try {
    if (method === PATCH) {
      const data = await playsService.update(
        uid,
        gameId,
        playId,
        body.data.attributes
      );

      res.status(200).json({ data });
    } else if (method === DELETE) {
      const itemsService = ItemsService.getInstance(db);

      const playItems = await itemsService.getAll(uid, gameId, playId);
      await Promise.all(
        playItems.map((item) => itemsService.delete(uid, gameId, item.id))
      );
      await playsService.delete(uid, gameId, playId);

      res.status(204).json({});
    }
  } catch (error: any) {
    res.status(500).json(getError(500, error?.message));
  }
};

export default handler;
