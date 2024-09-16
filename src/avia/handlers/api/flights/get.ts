import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';

import { deserializeFlights } from '@/avia/serializers/aeroDataBox';

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const { aeroDataBoxHelperData, query } = req;
      const { xRapidapiKey } = aeroDataBoxHelperData!;

      const aeroDataBoxService = new AeroDataBoxService(xRapidapiKey);
      const data = await aeroDataBoxService.retreiveFlights(
        query.number as string,
        query.date as string
      );

      if (!Array.isArray(data)) throw data;
      if (data.length === 0) throw { status: 404, message: 'Not found.' };

      res.status(200).json({ data: deserializeFlights(data) });
    } catch (error: any) {
      const status = error.status ?? 500;
      res.status(status).json(getError(status, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default handler;
