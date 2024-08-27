import { useCallback, useMemo, useState } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { MyFlightData, MyFlightsState } from '@/myFlights/types';

const useMyFlights = (
  myFlightsData: MyFlightData[] | null
): {
  myFlights: MyFlightsState;
  myFlightsList: MyFlightData[];
  updateMyFlight: (flight: MyFlightData) => void;
} => {
  const [myFlights, setMyFlights] = useState<MyFlightsState>(
    myFlightsData ? getAttributeObjectFromArray(myFlightsData) : {}
  );
  const myFlightsList: MyFlightData[] = useMemo(
    () => Object.values(myFlights),
    [myFlights]
  );
  const updateMyFlight = useCallback(
    (flight: MyFlightData) =>
      setMyFlights((current) => ({ ...current, [flight.id]: flight })),
    []
  );

  return {
    myFlights,
    myFlightsList,
    updateMyFlight,
  };
};

export default useMyFlights;
