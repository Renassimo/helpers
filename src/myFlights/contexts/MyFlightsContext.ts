import { createContext } from 'react';

import { MyFlightsContextData } from '@/myFlights/types';
import {
  defaultAircraftsResult,
  defaultAirportsResult,
  defaultFlightsResult,
} from '@/avia/types/avia';

const MyFlightsContext = createContext<MyFlightsContextData>({
  // Flights data
  myFlights: {},
  myFlightsList: [],
  updateMyFlight: () => {},
  // Options
  options: null,
  // Matchers
  matchers: null,
  // Flights
  flightsResult: defaultFlightsResult,
  // Aircrafts
  aircraftsResult: defaultAircraftsResult,
  // Airports
  // Origins
  originsResult: defaultAirportsResult,
  // Destinations
  destinationsResult: defaultAirportsResult,
  // CleanUp
  cleanUp: () => {},
  // Loaded values
  loadedValues: {},
  // My Flight Form
  myFlightForm: {
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
    state: {},
    setValue: () => {},
    isEditing: false,
    onSubmit: async () => {},
    onDelete: async () => {},
    loading: false,
  },
});

export default MyFlightsContext;
