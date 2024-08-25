import NotionService from '@/common/services/notion';

import { deserializeFlights } from '@/myFlights/serializers';

const getFlights = async (notionService: NotionService, dataBaseID: string) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    sorts: [{ property: 'Date', direction: 'ascending' }],
  });
  if (!ok) return { error: data };

  const { results } = data;

  return { data: deserializeFlights(results) };
};

export default getFlights;
