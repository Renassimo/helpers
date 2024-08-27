import { NotionDBSelectProperties } from '@/common/types/notion';

interface MatchSchema {
  [key: string]: string[][];
}

// example
// const m: Matches = {
//   airlines: [['Airline', 'Alt airline'], ['Carrier']],
//   airports: [['Origin', 'Destination'], ['Place']],
//   manufacturers: [['Manufacturer'], ['Manufacturer']],
//   models: [['Model'], ['Model']],
// };

const mergeNotionDbSelectOptions = <T extends NotionDBSelectProperties>(
  objects: T[],
  matchSchema: MatchSchema
): { [key: string]: string[] } => {
  const mergedOptions: { [key: string]: string[] } = {};

  Object.entries(matchSchema).forEach(([key, matches]) => {
    const keyMergedOptions: string[] = [];
    matches.forEach((objectPropKeys, index) => {
      objectPropKeys.forEach((objectPropKey) => {
        const array = (
          objects[index]?.[objectPropKey]?.select.options ?? []
        ).map((option) => option.name);
        keyMergedOptions.push(...array);
      });
    });
    mergedOptions[key] = [...new Set(keyMergedOptions)];
  });

  return mergedOptions;
};

export default mergeNotionDbSelectOptions;
