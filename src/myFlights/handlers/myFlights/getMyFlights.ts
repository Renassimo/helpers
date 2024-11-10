import NotionService from '@/common/services/notion';

import { deserializeMyFlights } from '@/myFlights/serializers';

interface GetMyFligtsProps {
  notionService: NotionService;
  dataBaseID: string;
  cursor?: string;
  filter?: {
    cn?: string;
    reg?: string;
  };
}

const getMyFlights = async ({
  notionService,
  dataBaseID,
  cursor,
  filter,
}: GetMyFligtsProps) => {
  const { cn = null, reg = null } = filter || {};
  const hasFilters = !!(cn || reg);
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    sorts: [
      { property: 'Date', direction: 'descending' },
      { property: 'N', direction: 'descending' },
      { timestamp: 'created_time', direction: 'descending' },
    ],
    ...(hasFilters
      ? {
          filter: {
            and: [
              ...(cn
                ? [{ property: 'CN / MSN', rich_text: { equals: cn } }]
                : []),
              ...(reg
                ? [{ property: 'Registration', rich_text: { equals: reg } }]
                : []),
              ...[],
            ],
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
