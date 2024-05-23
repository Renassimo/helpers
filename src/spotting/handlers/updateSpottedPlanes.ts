import NotionService from '@/common/services/notion';

import { serializeSpottedPlanes } from '@/spotting/serializers';

import { SpottedPlaneSerializedDescription } from '@/spotting/types';

const updateSpottedPlanes = async (
  notionService: NotionService,
  requestBody: string
) => {
  const body = JSON.parse(requestBody);
  const serializedSpottedPlanes = serializeSpottedPlanes(body.data);
  const [firstSpottedPlane, ...followingSpottedPlanes] =
    serializedSpottedPlanes;

  const firstSpottedPlaneResponse = await notionService.updatePage(
    `${firstSpottedPlane?.id}`,
    {
      ...firstSpottedPlane.body,
    }
  );
  if (!firstSpottedPlaneResponse.ok)
    return {
      status: firstSpottedPlaneResponse.data?.status,
      responseBody: { error: firstSpottedPlaneResponse.data },
    };

  const followingSpottedPlanesResponses = await Promise.all(
    followingSpottedPlanes.map(
      (spottedPlane: SpottedPlaneSerializedDescription) =>
        notionService.updatePage(`${spottedPlane?.id}`, {
          ...spottedPlane.body,
        })
    )
  );

  const spottedPlanesResponses = [
    firstSpottedPlaneResponse,
    ...followingSpottedPlanesResponses,
  ];

  return {
    status: 200,
    responseBody: {
      data: spottedPlanesResponses.map((spottedPlanesResponse) => ({
        id: spottedPlanesResponse.data.id,
        ok: spottedPlanesResponse.ok,
        error: !spottedPlanesResponse.ok
          ? spottedPlanesResponse.data
          : undefined,
      })),
    },
  };
};

export default updateSpottedPlanes;
