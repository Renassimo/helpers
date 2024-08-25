import { useCallback, useMemo, useState } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { MyFlightData, MyFlightsState } from '@/myFlights/types';

const useFlights = (
  flightsData: MyFlightData[] | null
): {
  flights: MyFlightsState;
  flightsList: MyFlightData[];
  updateFlight: (flight: MyFlightData) => void;
} => {
  const [flights, setFlights] = useState<MyFlightsState>(
    flightsData ? getAttributeObjectFromArray(flightsData) : {}
  );
  const flightsList: MyFlightData[] = useMemo(
    () => Object.values(flights),
    [flights]
  );
  const updateFlight = useCallback(
    (flight: MyFlightData) =>
      setFlights((current) => ({ ...current, [flight.id]: flight })),
    []
  );

  return {
    flights,
    flightsList,
    updateFlight,
  };
};

export default useFlights;
