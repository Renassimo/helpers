import { useCallback } from 'react';

import { Avia } from '@/avia/types/avia';

import useRetreiveData from '@/common/hooks/useRetreiveData';
import { Matcher } from '@/common/types/matchers';

const useAviaMatchers = (): {
  data: Avia.Matchers | null;
  updateMatchers: (data: Partial<Avia.Matchers>) => Promise<void>;
} => {
  const url = '/api/avia/matchers';
  const { data, retreive } = useRetreiveData<{
    data: Avia.Matchers;
  }>(url);

  const filterMachers = useCallback(
    (matchers: Partial<Avia.Matchers>): Partial<Avia.Matchers> | null => {
      const filteredMatchers: Partial<Avia.Matchers> = {};

      for (const key in matchers) {
        const oldMatcher = data?.data[key as keyof Avia.Matchers];
        const newMatcher = matchers[key as keyof Avia.Matchers];
        if (!newMatcher || !oldMatcher) continue;

        const filteredMatcher: Matcher = {};

        Object.entries(newMatcher as Matcher).forEach(
          ([matcherKey, matcherValue]) => {
            const oldMatcherValue = oldMatcher[matcherKey];
            if (oldMatcherValue && oldMatcherValue === matcherValue) return;
            filteredMatcher[matcherKey] = matcherValue;
          }
        );

        if (Object.keys(filteredMatcher).length === 0) continue;
        filteredMatchers[key as keyof Avia.Matchers] = filteredMatcher;
      }

      if (Object.keys(filteredMatchers).length === 0) return null;
      return filteredMatchers;
    },
    [data]
  );

  const updateMatchers = async (
    data: Partial<Avia.Matchers>
  ): Promise<void> => {
    const filteredMatchers = filterMachers(data);
    const hasNewMatchers =
      filteredMatchers &&
      Object.values(filteredMatchers).some(
        (matcher) => Object.values(matcher).length > 0
      );

    if (!hasNewMatchers) return;

    await retreive(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: filteredMatchers }),
    });
  };

  return { data: data?.data ?? null, updateMatchers };
};

export default useAviaMatchers;
