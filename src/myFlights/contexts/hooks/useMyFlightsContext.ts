import { useContext } from 'react';

import MyFlightsContext from '@/myFlights/contexts/MyFlightsContext';

const useMyFlightsContext = () => useContext(MyFlightsContext);

export default useMyFlightsContext;
