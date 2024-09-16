import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';

import { deserializeAirports } from '@/avia/serializers/aeroDataBox';
import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

interface AirportsQuery {
  text?: string;
  code?: string;
  lat?: string;
  lon?: string;
}

const handler = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const { aeroDataBoxHelperData } = req;
      const query = req.query as AirportsQuery;
      const { lat, lon, code, text } = query;
      const { xRapidapiKey } = aeroDataBoxHelperData!;

      const byIataCode = !!(code && code.length === 3);
      const byIcaoCode = !!(code && code.length === 4);
      const byLocation = !!(lat && lon);
      const byText = !!(text ?? (code && code.length > 4));

      const aeroDataBoxService = new AeroDataBoxService(xRapidapiKey);

      let data: (AeroDataBoxApi.Airport | AeroDataBoxApi.AirportExact)[] | null;

      if (byIataCode) {
        const result = await aeroDataBoxService.retreiveAirportByCode(
          code,
          'iata'
        );
        if (!result) throw { status: 404, message: 'Not found.' };
        if (result.message) throw result;
        data = [result];
      } else if (byIcaoCode) {
        const result = await aeroDataBoxService.retreiveAirportByCode(
          code,
          'icao'
        );
        if (!result) throw { status: 404, message: 'Not found.' };
        if (result.message) throw result;
        data = [result];
      } else if (byLocation) {
        const result = await aeroDataBoxService.retreiveAirportsByLocation(
          lat,
          lon
        );
        if (!Array.isArray(result)) throw result;
        data = result;
      } else if (byText) {
        const result = await aeroDataBoxService.retreiveAirportsByText(
          text ?? code ?? ''
        );
        if (!Array.isArray(result)) throw result;
        data = result;
      } else data = null;

      if (!data) throw { status: 400, message: 'Not all parameters provided' };
      if (data.length === 0) throw { status: 404, message: 'Not found.' };

      res.status(200).json({ data: deserializeAirports(data) });
    } catch (error: any) {
      const status = error.status ?? 500;
      res.status(status).json(getError(status, error?.message));
    }
  } else {
    res.status(405).json(getError(405));
  }
};

export default handler;
