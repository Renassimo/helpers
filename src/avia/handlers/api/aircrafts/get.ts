import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';

import { deserializeAircrafts } from '@/avia/serializers/aeroDataBox';

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const { aeroDataBoxHelperData, query } = req;
      const { xRapidapiKey } = aeroDataBoxHelperData!;

      const aeroDataBoxService = new AeroDataBoxService(xRapidapiKey);
      const data = await aeroDataBoxService.retrieveAircrafts(
        query.reg as string
      );

      if (!data.length) throw data;

      res.status(200).json({ data: deserializeAircrafts(data) });
    } catch (error: any) {
      res.status(500).json(getError(500, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default handler;
