import NotionService from '@/common/services/notion';

import {
  deserializePhotoInfo,
  serializePhotoInfo,
} from '@/spotting/serializers';

const createPhotoInfo = async (
  notionService: NotionService,
  dataBaseID: string,
  requestBody: string
) => {
  const body = JSON.parse(requestBody);

  const serializedData = serializePhotoInfo(body.data);

  const { ok, data } = await notionService.createPage(
    dataBaseID,
    serializedData
  );

  if (ok)
    return {
      status: 201,
      responseBody: { data: deserializePhotoInfo(data) },
    };
  return { status: data?.status, responseBody: { error: data } };
};

export default createPhotoInfo;
