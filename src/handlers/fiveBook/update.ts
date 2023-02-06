import NotionService from '@/services/notion';

import { deserializeDay, serializeDay } from '@/serializers/fiveBook';

const updateDay = async (notionService: NotionService, requestBody: string) => {
  const body = JSON.parse(requestBody);
  const serializedBody = serializeDay(body);

  const response = await notionService.updatePage(`${body?.id}`, {
    properties: serializedBody,
  });
  const data = await response.json();

  if (response.ok)
    return { status: 200, responseBody: { data: deserializeDay(data) } };
  return { status: data?.status, responseBody: { error: data } };
};

export default updateDay;
