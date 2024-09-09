import AviaMatchersService from '@/avia/services/AviaMatchers';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

const GET = 'GET';
const PATCH = 'PATCH';

const allowedMethods = [GET, PATCH];

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  const { uid, body, method, db } = req;

  if (!allowedMethods.includes(method as string))
    res.status(405).json(getError(405));

  const gamesService = AviaMatchersService.getInstance(db);

  try {
    if (method === GET) {
      const data = await gamesService.getAll(uid);

      res.status(200).json({ data });
    } else if (method === PATCH) {
      const data = await gamesService.update(uid, body.data);

      res.status(200).json({ data });
    }
  } catch (error: any) {
    res.status(500).json(getError(500, error?.message));
  }
};

export default handler;
