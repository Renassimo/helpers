import NotionService from '@/services/notion';

import { deserializeDay, serializeDay } from '@/fiveBook/serializers';

const updateDay = async (notionService: NotionService, requestBody: string) => {
  const body = JSON.parse(requestBody);
  const serializedBody = serializeDay(body.data);

  const { ok, data } = await notionService.updatePage(`${body?.data?.id}`, {
    properties: serializedBody,
  });

  if (ok) return { status: 200, responseBody: { data: deserializeDay(data) } };
  return { status: data?.status, responseBody: { error: data } };
};

export default updateDay;
