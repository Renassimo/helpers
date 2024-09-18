import { MyFlightData, MyFlightsContextData } from '@/myFlights/types';

import useFlights from '@/avia/hooks/useFlights';
import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';
import useAviaMatchers from '@/avia/hooks/useAviaMatchers';
import useAviaOptions from '@/avia/hooks/useAviaOptions';

import useMyFlights from './subhooks/useMyFlights';
import useLoadedValues from './subhooks/useLoadedValues';
import useMyFlightForm from './subhooks/useMyFlightForm';

const useMyFlightsProvider = (
  data: MyFlightData[] | null,
  nextCursor: string | null
): MyFlightsContextData => {
  // Options
  const { data: options, updateOptions } = useAviaOptions();

  // Matchers
  const { data: matchers, updateMatchers } = useAviaMatchers();

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
  const { myFlights, myFlightsList, updateMyFlight, deleteMyFlight } =
    useMyFlights(data, nextCursor);

  // My Flight Form
  const myFlightForm = useMyFlightForm(
    loadedValues,
    cleanUp,
    updateMyFlight,
    deleteMyFlight,
    updateOptions,
    updateMatchers
  );

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
    // My Flight Form
    myFlightForm,
  };
};

export default useMyFlightsProvider;
