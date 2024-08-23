import { createContext } from 'react';

import { FlightsContextData } from '@/myFlights/types';

const PlayContext = createContext<FlightsContextData>({
  // Flights data
  flights: {},
  flightsList: [],
  updateFlight: () => {},
});

export default PlayContext;
