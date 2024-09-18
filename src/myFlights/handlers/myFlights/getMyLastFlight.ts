import NotionService from '@/common/services/notion';

import { deserializeMyFlights } from '@/myFlights/serializers';
import { MyFlightData } from '@/myFlights/types';

const getMyLastFlight = async (
  notionService: NotionService,
  dataBaseID: string
): Promise<MyFlightData | null> => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    sorts: [
      { property: 'Date', direction: 'descending' },
      { property: 'N', direction: 'descending' },
      { timestamp: 'created_time', direction: 'descending' },
    ],
    page_size: 1,
  });
  if (!ok) throw data;

  const { results } = data;

  return deserializeMyFlights(results)[0] ?? null;
};

export default getMyLastFlight;
