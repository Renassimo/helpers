import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';
import NotionService from '@/common/services/notion';

import {
  convertMyFlightsToAircrafts,
  deserializeAircrafts,
} from '@/avia/serializers/aeroDataBox';

import getMyFlights from '@/myFlights/handlers/myFlights/getMyFlights';
import { getSpottedPlanes } from '@/spotting/handlers';
import { convertSpottedPlaneApiDataToAircrafts } from '@/spotting/serializers';

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const {
        notionHelperData = {
          additionalDbIds: { myFlights: '', spotting: '' },
          token: '',
        },
        aeroDataBoxHelperData = { xRapidapiKey: '' },
        query,
      } = req;
      const { additionalDbIds = { myFlights: '', spotting: '' }, token = '' } =
        notionHelperData;
      const { xRapidapiKey = '' } = aeroDataBoxHelperData;
      const {
        myFlights: myFlightsDataBaseID = '',
        spotting: spottingDataBaseID = '',
      } = additionalDbIds;

      if (query.useOwnDB === 'true') {
        const notionService = new NotionService(token);

        const [myFlights, spottedPlanes] = await Promise.all([
          getMyFlights({
            notionService,
            dataBaseID: myFlightsDataBaseID,
            filter: { reg: query.reg as string },
          }),
          getSpottedPlanes(
            notionService,
            spottingDataBaseID,
            query.reg as string
          ),
        ]);
        const myFlightsData = convertMyFlightsToAircrafts(
          myFlights?.data || []
        );
        const spottedPlanesData = convertSpottedPlaneApiDataToAircrafts(
          spottedPlanes?.data || []
        );
        const data = [...myFlightsData, ...spottedPlanesData];

        if (data.length) {
          res.status(200).json({
            data,
          });
          return;
        }
      }

      const aeroDataBoxService = new AeroDataBoxService(xRapidapiKey);
      const data = await aeroDataBoxService.retrieveAircrafts(
        query.reg as string
      );

      if (!Array.isArray(data)) throw data;
      if (data.length === 0) throw { status: 404, message: 'Not found.' };

      res.status(200).json({ data: deserializeAircrafts(data) });
    } catch (error: any) {
      const status = error.status ?? 500;
      res.status(status).json(getError(status, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default handler;
