import { MyFlightData, FlightsContextData } from '@/myFlights/types';

import useFlights from './subhooks/useFlights';

const usePlayProvider = (data: MyFlightData[] | null): FlightsContextData => {
  // Flights data
  const { flights, flightsList, updateFlight } = useFlights(data);

  return {
    // Flights data
    flights,
    flightsList,
    updateFlight,
  };
};

export default usePlayProvider;
