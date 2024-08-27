import { MyFlightData, MyFlightsContextData } from '@/myFlights/types';

import useMyFlights from './subhooks/useMyFlights';
import useRetreiveData from '@/common/hooks/useRetreiveData';
import { Avia } from '@/avia/types/avia';
import useFlights from './subhooks/useFlights';
import useAircrafts from './subhooks/useAircrafts';
import useAirports from './subhooks/useAirports';

const useMyFlightsProvider = (
  data: MyFlightData[] | null
): MyFlightsContextData => {
  // Flights data
  const { myFlights, myFlightsList, updateMyFlight } = useMyFlights(data);

  // Options
  const { data: options } = useRetreiveData<Avia.Options>('/api/avia/options');

  // Flights
  const flightsResult = useFlights();
  // const {
  //   flights,
  //   chosenFlight,
  //   retreiveFlights,
  //   chooseFlight,
  //   clearChosenFlight,
  // } = flightsResult;

  // Aircrafs
  const aircraftsResult = useAircrafts();
  // const {
  //   aircrafts,
  //   chosenAircraft,
  //   retreiveAircrafts,
  //   chooseAircraft,
  //   clearChosenAircraft,
  // } = aircraftsResult;

  // Airports
  const airportsResult = useAirports();
  // const {
  //   airports,
  //   chosenAirport,
  //   retreiveAirports,
  //   chooseAirport,
  //   clearChosenAirport,
  // } = airportsResult;

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
    airportsResult,
  };
};

export default useMyFlightsProvider;
