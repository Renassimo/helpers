import { useCallback, useEffect, useMemo, useState } from 'react';

import useRetreiveData from '@/common/hooks/useRetreiveData';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { MyFlightData, MyFlightsState } from '@/myFlights/types';

const useMyFlights = (
  myFlightsData: MyFlightData[] | null,
  cursor: string | null | undefined = null
): {
  myFlights: MyFlightsState;
  myFlightsList: MyFlightData[];
  updateMyFlight: (flight: MyFlightData) => void;
  deleteMyFlight: (id: string) => void;
} => {
  const { retreive } = useRetreiveData<{
    data: MyFlightData[];
    nextCursor: string | null;
  }>();

  const [myFlights, setMyFlights] = useState<MyFlightsState>(
    myFlightsData ? getAttributeObjectFromArray(myFlightsData) : {}
  );
  const myFlightsList: MyFlightData[] = useMemo(
    () => Object.values(myFlights),
    [myFlights]
  );
  const updateMyFlight = useCallback(
    (flight: MyFlightData) =>
      setMyFlights((current) => {
        const { id } = flight;
        return current[id]
          ? {
              ...current,
              [id]: flight,
            }
          : {
              [id]: flight,
              ...current,
            };
      }),
    []
  );

  const retreiveMyNextFlights = useCallback(
    async (currentCursor: string) => {
      if (!currentCursor) return;

      const response = await retreive(`/api/myFlights?cursor=${currentCursor}`);
      if (!response) return;

      const { data, nextCursor } = response;
      console.log({ data, nextCursor });
      setMyFlights((current) => ({
        ...current,
        ...getAttributeObjectFromArray(data),
      }));

      if (nextCursor) retreiveMyNextFlights(nextCursor);
    },
    [cursor]
  );

  useEffect(() => {
    if (cursor) retreiveMyNextFlights(cursor);
  }, []);

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
