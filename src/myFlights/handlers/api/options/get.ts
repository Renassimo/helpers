import NotionService from '@/common/services/notion';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

import getOptions from '@/myFlights/handlers/getOptions';

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const { notionHelperData } = req;
      const {
        dataBaseID: fligtsDbId,
        token,
        additionalDbIds,
      } = notionHelperData!;
      const { spotting: spottingDbId } = additionalDbIds!;

      const notionService = new NotionService(token);
      const data = await getOptions(notionService, fligtsDbId, spottingDbId);

      res.status(200).json({ data });
    } catch (error: any) {
      const { status, message } = error ?? {};

      if (typeof status === 'number') {
        res.status(status).json(error?.message ? error : getError(status));
      } else {
        res.status(500).json(getError(500, message));
      }
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default handler;
