import { NextApiResponse } from 'next';

import { withAuthApi } from '@/lib/middlewares/withAuth';

import { getError } from '@/utils/errors';

import { NextApiRequestWithAuth } from '@/types/auth';

import NotionService from '@/services/notion';

import { updateDay } from '@/fiveBook/handlers';

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const notionService = new NotionService(req.notionHelperData?.token);
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

export default withAuthApi(handler, 'fiveBook');
