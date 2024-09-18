import NotionService from '@/common/services/notion';

import getMyLastFlight from '@/myFlights/handlers/myFlights/getMyLastFlight';

import {
  deserializeMyFlights,
  serializeMyFlight,
} from '@/myFlights/serializers';

const createMyFlight = async (
  notionService: NotionService,
  dataBaseID: string,
  requestBody: string
) => {
  const body = JSON.parse(requestBody);
  let { number } = body.data.attributes;

  if (!number) {
    const lastFlightNumber = (await getMyLastFlight(notionService, dataBaseID))
      ?.attributes.number;

    if (lastFlightNumber) number = lastFlightNumber + 1;
  }

  const serializedData = serializeMyFlight({
    ...body.data,
    attributes: { ...body.data.attributes, number },
  });

  const { ok, data } = await notionService.createPage(
    dataBaseID,
    serializedData
  );

  if (ok)
    return {
      status: 200,
      responseBody: { data: deserializeMyFlights([data])[0] },
    };
  return { status: data?.status, responseBody: { error: data } };
};

export default createMyFlight;
