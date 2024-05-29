import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import GamesService from '@/gameMaps/services/games/GamesService';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { uid, body, db } = req;

      const gamesService = GamesService.getInstance(db);
      const data = await gamesService.create(uid, body.data.attributes);

      res.status(201).json(data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json(getError(500, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default withAuthApi(handler, getFirestore());
