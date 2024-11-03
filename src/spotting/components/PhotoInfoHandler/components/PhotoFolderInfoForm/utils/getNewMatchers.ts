import { Avia } from '@/avia/types/avia';
import { Matcher } from '@/common/types/matchers';
import { PhotoFolderInfoAttributes } from '@/spotting/types';

const getNewMatchers = (
  loadedValues: Partial<PhotoFolderInfoAttributes>,
  formState: Partial<PhotoFolderInfoAttributes>
): Avia.Matchers | null => {
  const getNewMatcher = (key: string): Matcher => {
    const loadedValue = loadedValues[key as keyof PhotoFolderInfoAttributes];
    const stateValue = formState[key as keyof PhotoFolderInfoAttributes];

    if (!loadedValue || !stateValue) return {};

    return loadedValue !== stateValue
      ? { [String(loadedValue)]: String(stateValue) }
      : {};
  };

  const airports = getNewMatcher('place');
  const airlines = getNewMatcher('carrier');
  const manufacturers = getNewMatcher('manufacturer');
  const models = getNewMatcher('model');

  const hasNewMatchers = [airports, airlines, manufacturers, models].some(
    (matcher) => Object.keys(matcher).length > 0
  );

  if (!hasNewMatchers) return null;

  return {
    airlines,
    airports,
    manufacturers,
    models,
  };
};

export default getNewMatchers;
