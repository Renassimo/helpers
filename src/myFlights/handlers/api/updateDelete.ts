import { NextApiResponse } from 'next';

import { getError } from '@/common/utils/errors';

import { NextApiRequestWithAuth } from '@/auth/types';

import NotionService from '@/common/services/notion';

import updateMyFlight from '@/myFlights/handlers/myFlights/updateMyFlight';
import deleteMyFlight from '@/myFlights/handlers/myFlights/deleteMyFlight';

const allowedMethods = ['PATCH', 'DELETE'];

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
  if (!allowedMethods.includes(req.method as string)) {
    res.status(405).json(getError(405));
    return;
  }

  try {
    const notionService = new NotionService(req.notionHelperData?.token);
    if (req.method === 'PATCH') {
      const { status, responseBody } = await updateMyFlight(
        notionService,
        req.query.id as string,
        req?.body
      );
      res.status(status).json(responseBody);
    }
    if (req.method === 'DELETE') {
      const { status } = await deleteMyFlight(
        notionService,
        req.query.id as string
      );
      res.status(status).json({});
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
