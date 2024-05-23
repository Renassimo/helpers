import { useCallback } from 'react';

import {
  SpottedPlaneCreatedData,
  SpottedPlaneProviderData,
} from '@/types/spotting';

import useAlerts from '@/common/hooks/alerts';
import useUpdateSpottedPlanes from '@/spotting/hooks/useUpdateSpottedPlanes';
import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';

const useApplySpottedPlanes = () => {
  const { update: updatePlanes, loading } = useUpdateSpottedPlanes();
  const { removeSpottedPlane } = useSpottedPlanes();
  const { createErrorAlert } = useAlerts();

  const update = useCallback(
    async (spottedPlanes: SpottedPlaneProviderData[]) => {
      const data = spottedPlanes.reduce(
        (
          result: SpottedPlaneCreatedData[],
          spottedPlane: SpottedPlaneProviderData
        ) => {
          if (!spottedPlane) return result;
          const {
            id,
            description,
            hashtags,
            newFirstFlight,
            groupName,
            groupDescription,
            groupHashtags,
          } = spottedPlane;
          return [
            ...result,
            {
              id,
              attributes: {
                description,
                hashtags,
                newFirstFlight,
                groupName,
                groupDescription,
                groupHashtags,
              },
            },
          ];
        },
        []
      );

      try {
        const response: { data: { id: string; ok: boolean }[] } =
          await updatePlanes({ data });
        const responseData = response.data;
        Object.values(responseData).forEach((value) => {
          const { id, ok } = value;
          if (ok) removeSpottedPlane(id);
          if (!ok) createErrorAlert(`Got error while updating ${id}`);
        });
      } catch (error: any) {
        createErrorAlert(error.message);
      }
    },
    [createErrorAlert, removeSpottedPlane, updatePlanes]
  );

  return {
    update,
    loading,
  };
};

export default useApplySpottedPlanes;
