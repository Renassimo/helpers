import { useCallback, useState } from 'react';

import {
  LineWord,
  SpottedPlaneApiData,
  SpottedPlaneProviderData,
} from '@/spotting/types';

import {
  appendEmptyLines,
  convertLinesIntoText,
  getDescriptionLines,
  getFirstSelectedDescriptionLines,
  getHashtagLines,
  getNextSelectedDescriptionLines,
  mergeLines,
  putTheLine,
} from '@/spotting/utils';
import { getCommons } from '@/spotting/utils/commons';

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
      return { text, lines };
    },
    [spottingData, updateDescription]
  );

  const generateHashtags = useCallback(
    (id: string) => {
      const lines = getHashtagLines(spottingData[id]);
      const text = convertLinesIntoText(lines);

      updateHashtags(id, text);
      return { text, lines };
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

  const clearGroupData = useCallback(() => {
    setGroupName('');
    setGroupDescription('');
    setGroupHashtags('');
  }, []);

  const generateGroupDescriptionAndHashtags = useCallback(() => {
    const commons = getCommons(selectedIds, spottingData);

    const [firstSelectedId] = selectedIds;

    const { lines: descriptionLines } = generateDescription(firstSelectedId);
    const updatedDescriptionLines = getFirstSelectedDescriptionLines(
      descriptionLines,
      commons
    );
    setGroupDescription(`${convertLinesIntoText(updatedDescriptionLines)}\n`);

    const updatedHashtagLines: LineWord[][] = [];

    selectedIds.forEach((id: string) => {
      const { lines: descriptionLines } = generateDescription(id);
      const updatedDescriptionLines = getNextSelectedDescriptionLines(
        descriptionLines,
        commons
      );
      appendDescription(convertLinesIntoText(updatedDescriptionLines));

      const { lines: hashtagLines } = generateHashtags(id);
      hashtagLines.forEach((line, index) => {
        const currentLine = updatedHashtagLines[index] ?? [];
        updatedHashtagLines[index] = mergeLines(currentLine, line);
      });
    });

    const hashtagsText = appendEmptyLines(
      convertLinesIntoText(updatedHashtagLines)
    );
    setGroupHashtags(hashtagsText);
  }, [
    appendDescription,
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
