import { NextApiResponse } from 'next';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import { getError } from '@/common/utils/errors';

import { NextApiRequestWithAuth } from '@/common/types/auth';

import NotionService from '@/common/services/notion';

import { updateSpottedPlanes } from '@/spotting/handlers';

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const notionService = new NotionService(req.notionHelperData?.token);
      const { status, responseBody } = await updateSpottedPlanes(
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

export default withAuthApi(handler, 'spotting');
