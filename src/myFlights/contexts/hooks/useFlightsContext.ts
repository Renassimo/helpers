import { useContext } from 'react';

import FlightsContext from '@/myFlights/contexts/FlightsContext';

const useFlightsContext = () => useContext(FlightsContext);

export default useFlightsContext;
