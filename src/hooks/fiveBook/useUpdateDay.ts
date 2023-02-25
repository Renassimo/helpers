import { useCallback, useState } from 'react';

const useUpdateDay = () => {
  const [loading, setLoading] = useState(false);

  const update = useCallback(
    async (dayCode: string, payload: Record<string, any>) => {
      setLoading(true);

      const response = await fetch(`/api/5book/${dayCode}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();

      setLoading(false);
      return responseData;
    },
    [setLoading]
  );

  return { update, loading };
};

export default useUpdateDay;
