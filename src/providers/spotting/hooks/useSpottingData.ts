import { useState } from 'react';

import {
  SpottedPlaneApiData,
  SpottedPlaneProviderData,
} from '@/types/spotting';

import {
  convertLinesIntoText,
  getDescriptionLines,
  getHashtagLines,
} from '@/utils/spotting';

export const defaultDescriptionData = {
  description: '',
  hashtags: '',
  newFirstFlight: undefined,
  groupName: undefined,
  groupDescription: undefined,
  groupHashtags: undefined,
};

const useSpottingData = (data: SpottedPlaneApiData[] | null) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [spottingData, setSpottingData] = useState<
    Record<string, SpottedPlaneProviderData>
  >(
    data?.reduce(
      (result, { id, attributes }: SpottedPlaneApiData) => ({
        ...result,
        [id]: {
          id,
          ...attributes,
          ...defaultDescriptionData,
        },
      }),
      {}
    ) ?? {}
  );

  const updateSpottedPlane = (id: string, payload: Record<string, string>) => {
    setSpottingData((current) => {
      const item = current[id];
      if (item) {
        return {
          ...current,
          [id]: {
            ...item,
            ...payload,
          },
        };
      }
      return current;
    });
  };

  const removeSpottedPlane = (id: string) => {
    setSpottingData((current) => {
      const currentCopy = { ...current };
      delete currentCopy[id];
      return currentCopy;
    });
  };

  const updateDescription = (id: string, description: string) =>
    updateSpottedPlane(id, { description });

  const updateHashtags = (id: string, hashtags: string) =>
    updateSpottedPlane(id, { hashtags });

  const updateNewFirstFlight = (id: string, newFirstFlight: string) =>
    updateSpottedPlane(id, { newFirstFlight });

  const updateGroupName = (id: string, groupName: string) =>
    updateSpottedPlane(id, { groupName });

  const updateGroupDescription = (id: string, groupDescription: string) =>
    updateSpottedPlane(id, { groupDescription });

  const updateGroupHashtags = (id: string, groupHashtags: string) =>
    updateSpottedPlane(id, { groupHashtags });

  const filterPlanes = (ids: string[]) => {
    setSpottingData((current: Record<string, SpottedPlaneProviderData>) =>
      Object.values(current).reduce(
        (result, item) =>
          ids.includes(item.id) ? result : { [item.id]: item },
        {}
      )
    );
    removeSelectedIds(ids);
  };

  const spottedPlanes: SpottedPlaneProviderData[] = Object.values(spottingData);

  const addSelectedId = (id: string) => {
    setSelectedIds((current: string[]) => [...new Set(current).add(id)]);
  };

  const removeSelectedIds = (ids: string[]) => {
    setSelectedIds((current) =>
      current.filter((id: string) => !ids.includes(id))
    );
  };

  const getUpdateFunctions = (id: string) => ({
    updateDescription: (payload: string) => updateDescription(id, payload),
    updateHashtags: (payload: string) => updateHashtags(id, payload),
    updateNewFirstFlight: (payload: string) =>
      updateNewFirstFlight(id, payload),
    updateGroupName: (payload: string) => updateGroupName(id, payload),
    updateGroupDescription: (payload: string) =>
      updateGroupDescription(id, payload),
    updateGroupHashtags: (payload: string) => updateGroupHashtags(id, payload),
  });

  const generateDescription = (id: string) => {
    const lines = getDescriptionLines(spottingData[id]);
    const text = convertLinesIntoText(lines);

    updateDescription(id, text);
  };

  const generateHashtags = (id: string) => {
    const lines = getHashtagLines(spottingData[id]);
    const text = convertLinesIntoText(lines);

    updateHashtags(id, text);
  };

  const clearDescription = (id: string) => updateDescription(id, '');
  const clearHashtags = (id: string) => updateHashtags(id, '');

  return {
    spottedPlanes,
    removeSpottedPlane,
    updateDescription,
    updateHashtags,
    updateNewFirstFlight,
    updateGroupName,
    updateGroupDescription,
    updateGroupHashtags,
    getUpdateFunctions,
    filterPlanes,
    selectedIds,
    addSelectedId,
    removeSelectedIds,
    generateDescription,
    generateHashtags,
    clearDescription,
    clearHashtags,
  };
};

export default useSpottingData;