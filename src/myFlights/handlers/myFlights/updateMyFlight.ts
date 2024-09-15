import NotionService from '@/common/services/notion';

import {
  deserializeMyFlights,
  serializeMyFlight,
} from '@/myFlights/serializers';

const updateMyFlight = async (
  notionService: NotionService,
  id: string,
  requestBody: string
) => {
  const body = JSON.parse(requestBody);
  const serializedData = serializeMyFlight(body.data);

  const { ok, data } = await notionService.updatePage(id, serializedData);

  if (ok)
    return {
      status: 200,
      responseBody: { data: deserializeMyFlights([data])[0] },
    };
  return { status: data?.status, responseBody: { error: data } };
};

export default updateMyFlight;
