import { MyFlightData, MyFlightsContextData } from '@/myFlights/types';

import useMyFlights from './subhooks/useMyFlights';
import useRetreiveData from '@/common/hooks/useRetreiveData';

import useFlights from '@/avia/hooks/useFlights';
import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';

import { Avia } from '@/avia/types/avia';
import useLoadedValues from './subhooks/useLoadedValues';

const useMyFlightsProvider = (
  data: MyFlightData[] | null
): MyFlightsContextData => {
  // Flights data
  const { myFlights, myFlightsList, updateMyFlight } = useMyFlights(data);

  // Options
  const { data: options } = useRetreiveData<Avia.Options>('/api/avia/options');

  // Flights
  const flightsResult = useFlights();

  // Aircrafs
  const aircraftsResult = useAircrafts();

  // Airports
  // Origin
  const originsResult = useAirports();
  // Destination
  const destinationsResult = useAirports();

  // Loaded values
  const { loadedValues, cleanUp } = useLoadedValues({
    flightsResult,
    aircraftsResult,
    originsResult,
    destinationsResult,
  });

  return {
    // Flights data
    myFlights,
    myFlightsList,
    updateMyFlight,
    // Options
    options,
    // Flights
    flightsResult,
    // Aircrafts
    aircraftsResult,
    // Airports
    originsResult,
    destinationsResult,
    // CleanUp
    cleanUp,
    // Loaded values
    loadedValues,
  };
};

export default useMyFlightsProvider;
