import { useCallback, useMemo, useState } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { FlightData, FlightsState } from '@/myFlights/types';

const useFlights = (
  flightsData: FlightData[] | null
): {
  flights: FlightsState;
  flightsList: FlightData[];
  updateFlight: (flight: FlightData) => void;
} => {
  const [flights, setFlights] = useState<FlightsState>(
    flightsData ? getAttributeObjectFromArray(flightsData) : {}
  );
  const flightsList: FlightData[] = useMemo(
    () => Object.values(flights),
    [flights]
  );
  const updateFlight = useCallback(
    (flight: FlightData) =>
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
