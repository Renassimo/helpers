import { MyFlightData, MyFlightsContextData } from '@/myFlights/types';

import useFlights from '@/avia/hooks/useFlights';
import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';
import useAviaMatchers from '@/avia/hooks/useAviaMatchers';
import useAviaOptions from '@/avia/hooks/useAviaOptions';

import useMyFlights from './subhooks/useMyFlights';
import useLoadedValues from './subhooks/useLoadedValues';

const useMyFlightsProvider = (
  data: MyFlightData[] | null
): MyFlightsContextData => {
  // Options
  const { data: options /* updateOptions */ } = useAviaOptions();

  // Matchers
  const { data: matchers /* updateMatchers */ } = useAviaMatchers();

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

  // Flights data
  const { myFlights, myFlightsList, updateMyFlight } = useMyFlights(data);

  return {
    // Flights data
    myFlights,
    myFlightsList,
    updateMyFlight,
    // Options
    options,
    // Matchers
    matchers,
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
