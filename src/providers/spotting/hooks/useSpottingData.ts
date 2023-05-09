import { useCallback, useState } from 'react';

import {
  SpottedPlaneApiData,
  SpottedPlaneProviderData,
} from '@/types/spotting';

import {
  convertLinesIntoText,
  getDescriptionLines,
  getHashtagLines,
  putTheLine,
} from '@/utils/spotting';

export const defaultDescriptionData = {
  description: '',
  hashtags: '',
  newFirstFlight: undefined,
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
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupHashtags, setGroupHashtags] = useState('');

  const updateSpottedPlane = useCallback(
    (id: string, payload: Record<string, string>) => {
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
    },
    [setSpottingData]
  );

  const removeSpottedPlane = useCallback(
    (id: string) => {
      setSpottingData((current) => {
        const currentCopy = { ...current };
        delete currentCopy[id];
        return currentCopy;
      });
    },
    [setSpottingData]
  );

  const updateDescription = useCallback(
    (id: string, description: string) =>
      updateSpottedPlane(id, { description }),
    [updateSpottedPlane]
  );

  const updateHashtags = useCallback(
    (id: string, hashtags: string) => updateSpottedPlane(id, { hashtags }),
    [updateSpottedPlane]
  );

  const updateNewFirstFlight = useCallback(
    (id: string, newFirstFlight: string) =>
      updateSpottedPlane(id, { newFirstFlight }),
    [updateSpottedPlane]
  );

  const spottedPlanes: SpottedPlaneProviderData[] = Object.values(spottingData);

  const addSelectedId = useCallback(
    (id: string) => {
      setSelectedIds((current: string[]) => [...new Set(current).add(id)]);
    },
    [setSelectedIds]
  );

  const removeSelectedIds = useCallback(
    (ids: string[]) => {
      setSelectedIds((current) =>
        current.filter((id: string) => !ids.includes(id))
      );
    },
    [setSelectedIds]
  );

  const clearSelectedIds = useCallback(() => {
    setSelectedIds([]);
  }, [setSelectedIds]);

  const generateDescription = useCallback(
    (id: string) => {
      const lines = getDescriptionLines(spottingData[id]);
      const text = convertLinesIntoText(lines);

      updateDescription(id, text);
      return text;
    },
    [spottingData, updateDescription]
  );

  const generateHashtags = useCallback(
    (id: string) => {
      const lines = getHashtagLines(spottingData[id]);
      const text = convertLinesIntoText(lines);

      updateHashtags(id, text);
      return text;
    },
    [spottingData, updateHashtags]
  );

  const clearDescription = useCallback(
    (id: string) => updateDescription(id, ''),
    [updateDescription]
  );
  const clearHashtags = useCallback(
    (id: string) => updateHashtags(id, ''),
    [updateHashtags]
  );

  const appendDescription = useCallback(
    (description: string) => {
      setGroupDescription(
        (currentGroupDescription) =>
          `${putTheLine(currentGroupDescription)}[]\n${description}\n`
      );
    },
    [setGroupDescription]
  );

  const appendHashtags = useCallback(
    (hashtags: string) => {
      setGroupHashtags((currentGroupHashtags) =>
        [
          ...new Set(
            `#renassimo_spotted${currentGroupHashtags}${
              hashtags.split('#renassimo_spotted')[0]
            }`
              .split('#')
              .map((item) => item.trim())
              .filter((item) => item)
              .map((item) => `#${item}`)
          ),
        ].join(' ')
      );
    },
    [setGroupHashtags]
  );

  const clearGroupData = useCallback(() => {
    setGroupName('');
    setGroupDescription('');
    setGroupHashtags('');
  }, []);

  const generateGroupDescriptionAndHashtags = useCallback(() => {
    selectedIds.forEach((id: string) => {
      const { description, hashtags } = spottingData[id];
      console.log({ description, hashtags });
      const descriptionText = description || generateDescription(id);
      const hashtagsText = hashtags || generateHashtags(id);
      appendDescription(descriptionText);
      appendHashtags(hashtagsText);
    });
  }, [
    appendDescription,
    appendHashtags,
    generateDescription,
    generateHashtags,
    selectedIds,
    spottingData,
  ]);

  return {
    spottedPlanes,
    removeSpottedPlane,
    updateDescription,
    updateHashtags,
    updateNewFirstFlight,
    selectedIds,
    addSelectedId,
    removeSelectedIds,
    generateDescription,
    generateHashtags,
    clearDescription,
    clearHashtags,
    groupDescription,
    groupHashtags,
    groupName,
    setGroupDescription,
    setGroupHashtags,
    setGroupName,
    generateGroupDescriptionAndHashtags,
    clearGroupData,
    clearSelectedIds,
  };
};

export default useSpottingData;
