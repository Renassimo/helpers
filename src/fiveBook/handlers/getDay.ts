import NotionService from '@/common/services/notion';
import { deserializeDay } from '@/fiveBook/serializers';

const getDay = async (
  notionService: NotionService,
  dataBaseID: string,
  dayCode: string
) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    filter: {
      and: [{ property: 'Day code', number: { equals: +dayCode } }],
    },
  });

  if (ok) {
    const [result] = data?.results;
    return result
      ? { data: deserializeDay(result) }
      : { error: { status: 404 } };
  } else {
    return { error: data };
  }
};

export default getDay;
