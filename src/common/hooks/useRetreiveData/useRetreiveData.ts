import { useCallback, useEffect, useState } from 'react';

import { useErrorAlert } from '@/common/hooks/alerts';

import { CommonError } from '@/common/types/errors';

const useRetreiveData = <D>(
  url?: string
): {
  data: D | null;
  retreive: (url: string) => Promise<D | null>;
  loading: boolean;
  error: CommonError | null;
  cleanData: () => void;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CommonError | null>(null);
  const [data, setData] = useState<D | null>(null);

  useErrorAlert(error);

  const retreive = useCallback(async (url: string): Promise<D | null> => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = (await response.json()) as D;
      if (!response.ok) throw data;
      setData(data);
      setLoading(false);
      return data;
    } catch (caught: any) {
      const error = caught?.error ?? caught;
      setError(error as CommonError);
      setLoading(false);
      return null;
    }
  }, []);

  useEffect(() => {
    if (url && typeof window !== 'undefined') retreive(url);
  }, [url]);

  const cleanData = useCallback(() => {
    setData(null);
  }, []);

  return { data, retreive, loading, error, cleanData };
};

export default useRetreiveData;
