import { Avia } from '@/avia/types/avia';

import useRetreiveData from '@/common/hooks/useRetreiveData';

const useAviaOptions = (): {
  data: Avia.Options | null;
  updateOptions: () => Promise<void>;
} => {
  const url = '/api/avia/options';
  const { data, retreive } = useRetreiveData<{
    data: Avia.Options;
  }>(url);

  const updateOptions = async (): Promise<void> => {
    await retreive(url);
  };

  return { data: data?.data ?? null, updateOptions };
};

export default useAviaOptions;
