import { NextApiResponse } from 'next';

import withAuth from '@/lib/middlewares/withAuth';

import getUserNotionData from '@/utils/userNotinData';
import { getError } from '@/utils/errors';

import { NextApiRequestWithAuth } from '@/types/auth';

import NotionService from '@/services/notion';

import { updateDay } from '@/handlers/fiveBook';

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const { notionData = null } = await getUserNotionData(`${req.uid}`);
      const { fiveBook = null } = notionData ?? {};
      const { token = null } = fiveBook ?? {};

      const notionService = new NotionService(token);

      const { status, responseBody } = await updateDay(
        notionService,
        req?.body
      );
      res.status(status).json(responseBody);
    } catch (error: any) {
      console.error(error);
      res.status(500).json(getError(500, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default withAuth(handler);
