import { Avia } from '@/avia/types/avia';

import useRetreiveData from '@/common/hooks/useRetreiveData';

const useAviaMatchers = (): {
  data: Avia.Matchers | null;
  updateMatchers: (data: Partial<Avia.Matchers>) => Promise<void>;
} => {
  const url = '/api/avia/matchers';
  const { data, retreive } = useRetreiveData<{
    data: Avia.Matchers;
  }>(url);

  const updateMatchers = async (
    data: Partial<Avia.Matchers>
  ): Promise<void> => {
    await retreive(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
  };

  return { data: data?.data ?? null, updateMatchers };
};

export default useAviaMatchers;
