import NotionService from '@/common/services/notion';

import { deserializeMyFlights } from '@/myFlights/serializers';

const getMyFlights = async (
  notionService: NotionService,
  dataBaseID: string,
  cursor?: string
) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    sorts: [
      { property: 'Date', direction: 'descending' },
      { property: 'N', direction: 'descending' },
      { timestamp: 'created_time', direction: 'descending' },
    ],
    ...(cursor ? { start_cursor: cursor } : {}),
  });
  if (!ok) return { error: data };

  const { results, next_cursor: nextCursor, has_more: hasMore } = data;

  return {
    data: deserializeMyFlights(results),
    nextCursor: hasMore ? nextCursor : null,
  };
};

export default getMyFlights;
