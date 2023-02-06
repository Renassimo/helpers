import { NotionError } from '@/types/notion';
import { FiveBookData } from '@/types/fiveBook';

import NotionService from '@/services/notion';
import { deserializeDay } from '@/serializers/fiveBook';

export const getDay = async (
  notionService: NotionService,
  dataBaseID: string,
  dayCode: string
) => {
  const value: { data: FiveBookData | null; error: NotionError | null } = {
    data: null,
    error: null,
  };
  const response = await notionService.queryDatabase(dataBaseID, {
    filter: {
      and: [{ property: 'Day code', number: { equals: +dayCode } }],
    },
  });
  const data = await response.json();
  if (response.ok) {
    const [result] = data?.results;
    if (result) {
      value.data = deserializeDay(result, dayCode);
    } else {
      value.error = { status: 404 };
    }
  } else {
    // @ts-ignore
    value.error = data;
  }

  return value;
};
