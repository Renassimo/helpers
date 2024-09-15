import NotionService from '@/common/services/notion';

import { deserializeMyFlights } from '@/myFlights/serializers';

const getMyFlights = async (
  notionService: NotionService,
  dataBaseID: string
) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    sorts: [{ property: 'Date', direction: 'ascending' }],
  });
  if (!ok) return { error: data };

  const { results } = data;

  return { data: deserializeMyFlights(results) };
};

export default getMyFlights;
