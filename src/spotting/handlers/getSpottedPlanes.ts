import { NotionBlockChildrenResult, NotionResult } from '@/types/notion';

import NotionService from '@/services/notion';

import { deserializeSpottedPlanes } from '@/serializers/spotting';

const getSpottedPlanes = async (
  notionService: NotionService,
  dataBaseID: string
) => {
  const { ok, data } = await notionService.queryDatabase(dataBaseID, {
    filter: {
      and: [
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
