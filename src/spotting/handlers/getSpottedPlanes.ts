import { NotionBlockChildrenResult, NotionResult } from '@/common/types/notion';

import NotionService from '@/common/services/notion';

import { deserializeSpottedPlanes } from '@/spotting/serializers';

const getSpottedPlanes = async (
  notionService: NotionService,
  dataBaseID: string,
  registration?: string
) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    filter: {
      and: registration
        ? [{ property: 'Registration', rich_text: { equals: registration } }]
        : [
            { property: 'Info Ready', checkbox: { equals: true } },
            { property: 'Ready to publish', checkbox: { equals: false } },
          ],
    },
  });
  if (!ok) return { error: data };

  const { results } = data;
  const blockChildren = await Promise.all(
    results.map((result: NotionResult) =>
      notionService.retrieveBlockChildren(result.id)
    )
  );

  const photoUrls = blockChildren?.reduce((images, photo) => {
    const image = photo?.data?.results?.find(
      (result: NotionBlockChildrenResult) => result.type === 'image'
    );
    if (!image) return images;

    return {
      ...images,
      [image?.parent?.page_id]: image?.image?.file?.url,
    };
  }, {});

  return { data: deserializeSpottedPlanes(results, photoUrls) };
};

export default getSpottedPlanes;
