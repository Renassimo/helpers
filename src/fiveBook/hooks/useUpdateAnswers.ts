import useFiveBook from '@/fiveBook/hooks/useFiveBook';
import useUpdateDay from '@/fiveBook/hooks/useUpdateDay';

import { getChangedAnswers } from '@/fiveBook/utils';
import { useCallback } from 'react';

const useUpdateAnswers = (onlyCreate = true) => {
  const { dayCode, answers, id, setData } = useFiveBook();
  const { update: updateDay, loading } = useUpdateDay();

  const update = useCallback(
    async (payload: Record<string, string>) => {
      const changedAnswers = getChangedAnswers(answers, payload, onlyCreate);
      if (!changedAnswers) throw new Error('No changes');

      const data = {
        id,
        attributes: {
          answers: changedAnswers,
        },
      };

      const response = await updateDay(dayCode, { data });
      if (response) setData(response.data);
    },
    [answers, dayCode, id, onlyCreate, setData, updateDay]
  );

  return {
    update,
    loading,
  };
};

export default useUpdateAnswers;
