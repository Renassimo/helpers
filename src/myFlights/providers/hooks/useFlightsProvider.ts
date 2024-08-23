import { FlightData, FlightsContextData } from '@/myFlights/types';

import useFlights from './subhooks/useFlights';

const usePlayProvider = (data: FlightData[] | null): FlightsContextData => {
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
