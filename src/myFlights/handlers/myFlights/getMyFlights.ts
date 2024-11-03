import NotionService from '@/common/services/notion';

import { deserializeMyFlights } from '@/myFlights/serializers';

interface GetMyFligtsProps {
  notionService: NotionService;
  dataBaseID: string;
  cursor?: string;
  filter?: {
    cn?: string;
  };
}

const getMyFlights = async ({
  notionService,
  dataBaseID,
  cursor,
  filter,
}: GetMyFligtsProps) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    sorts: [
      { property: 'Date', direction: 'descending' },
      { property: 'N', direction: 'descending' },
      { timestamp: 'created_time', direction: 'descending' },
    ],
    ...(filter
      ? {
          filter: {
            and: [{ property: 'CN / MSN', rich_text: { equals: filter.cn } }],
          },
        }
      : {}),
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
