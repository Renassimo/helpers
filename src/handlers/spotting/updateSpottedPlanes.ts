import NotionService from '@/services/notion';

import { serializeSpottedPlanes } from '@/serializers/spotting';

import { SpottedPlaneSerializedDescription } from '@/types/spotting';

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
      properties: firstSpottedPlane.body,
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
          properties: spottedPlane.body,
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
