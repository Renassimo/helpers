import { Avia } from '@/avia/types/avia';
import { UseFlightsResult } from '@/myFlights/types';

import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';

const useFlights = (): UseFlightsResult => {
  const {
    items: flights,
    chosenItem: chosenFlight,
    retreiveItems,
    chooseItem: chooseFlight,
    clearChosenItem: clearChosenFlight,
    loading,
    cleanUp: cleanUpFlights,
  } = useChooseRetreivedItem<Avia.FlightData>();

  // /api/avia/flights/fz 1839
  const retreiveFlights = async (flightNumber: string) =>
    await retreiveItems(`/api/avia/flights/${flightNumber}`);

  return {
    flights,
    chosenFlight,
    retreiveFlights,
    chooseFlight,
    clearChosenFlight,
    loading,
    cleanUpFlights,
  };
};

export default useFlights;
