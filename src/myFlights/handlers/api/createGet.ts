import { NextApiResponse } from 'next';

import { getError } from '@/common/utils/errors';

import { NextApiRequestWithAuth } from '@/auth/types';

import NotionService from '@/common/services/notion';

import createMyFlight from '@/myFlights/handlers/myFlights/createMyFlight';
import getMyFlights from '@/myFlights/handlers/myFlights/getMyFlights';

const allowedMethods = ['POST', 'GET'];

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
  if (!allowedMethods.includes(req.method as string)) {
    res.status(405).json(getError(405));
    return;
  }

  const notionService = new NotionService(req.notionHelperData?.token);

  try {
    if (req.method === 'POST') {
      const { status, responseBody } = await createMyFlight(
        notionService,
        req.notionHelperData?.dataBaseID ?? '',
        req?.body
      );

      res.status(status).json(responseBody);
    }
    if (req.method === 'GET') {
      const cursor = req.query.cursor as string;

      const cn = req.query.cn as string;
      const reg = req.query.reg as string;
      const hasFilter = cn || reg;

      if (!cursor && !hasFilter)
        throw { status: 400, message: 'Cursor did not passed' };

      const { error, data, nextCursor } = await getMyFlights({
        notionService,
        dataBaseID: req.notionHelperData?.dataBaseID ?? '',
        cursor,
        ...(hasFilter ? { filter: { cn, reg } } : {}),
      });

      if (error) throw error;

      res.status(200).json({ data, nextCursor });
    }
  } catch (error: any) {
    const { status, message } = error ?? {};

    if (typeof status === 'number') {
      res.status(status).json(error?.message ? error : getError(status));
    } else {
      res.status(500).json(getError(500, message));
    }
  }
};

export default handler;
