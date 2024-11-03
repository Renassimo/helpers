import { NextApiResponse } from 'next';

import { getError } from '@/common/utils/errors';

import { NextApiRequestWithAuth } from '@/auth/types';

import NotionService from '@/common/services/notion';

import createPhotoInfo from '../createPhotoInfo';

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const notionService = new NotionService(req.notionHelperData?.token);
      const { status, responseBody } = await createPhotoInfo(
        notionService,
        req.notionHelperData?.dataBaseID ?? '',
        req?.body
      );

      res.status(status).json(responseBody);
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
