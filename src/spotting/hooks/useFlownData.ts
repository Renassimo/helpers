import { useEffect } from 'react';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import { MyFlightData } from '@/myFlights/types';
import { Avia } from '@/avia/types/avia';

const useFlownData = (
  aircraftsResult: Avia.AircraftsResult
): { loading: boolean; data: { data: MyFlightData[] } | null } => {
  const { chosenAircraft } = aircraftsResult;
  const { retreive, loading, data } = useRetreiveData<{
    data: MyFlightData[];
  }>();

  useEffect(() => {
    const { serial, source } = chosenAircraft?.attributes || {};
    if (serial && source !== 'myFlights')
      retreive(`/api/myFlights?cn=${serial}`);
  }, [chosenAircraft]);

  return { loading, data };
};

export default useFlownData;
