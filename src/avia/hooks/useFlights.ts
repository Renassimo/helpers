import { Avia } from '@/avia/types/avia';

import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';

const useFlights = (): Avia.FlightsResult => {
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
  const retreiveFlights = async (flightNumber: string, date?: string | null) =>
    await retreiveItems(
      `/api/avia/flights/${flightNumber}${date ? `?date=${date}` : ''}`
    );

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
