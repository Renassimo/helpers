import { useCallback, useState } from 'react';

import { UpdateSpottedPlaneData } from '@/types/spotting';

const useUpdateSpottedPlanes = () => {
  const [loading, setLoading] = useState(false);

  const update = useCallback(
    async (payload: UpdateSpottedPlaneData) => {
      setLoading(true);

      const response = await fetch(`/api/spottedPlanes`, {
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

export default useUpdateSpottedPlanes;
