import { useCallback, useMemo, useState } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { MyFlightData, MyFlightsState } from '@/myFlights/types';

const useMyFlights = (
  myFlightsData: MyFlightData[] | null
): {
  myFlights: MyFlightsState;
  myFlightsList: MyFlightData[];
  updateMyFlight: (flight: MyFlightData) => void;
  deleteMyFlight: (id: string) => void;
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

  const deleteMyFlight = useCallback((id: string) => {
    setMyFlights((current) => {
      const coppied = { ...current };
      delete coppied[id];
      return coppied;
    });
  }, []);

  return {
    myFlights,
    myFlightsList,
    updateMyFlight,
    deleteMyFlight,
  };
};

export default useMyFlights;
