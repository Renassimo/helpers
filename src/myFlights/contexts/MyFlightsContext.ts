import { createContext } from 'react';

import { MyFlightsContextData } from '@/myFlights/types';

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
  flightsResult: {
    flights: null,
    chosenFlight: null,
    retreiveFlights: async () => null,
    chooseFlight: () => null,
    clearChosenFlight: () => null,
    loading: false,
    cleanUpFlights: () => {},
  },
  // Aircrafts
  aircraftsResult: {
    aircrafts: null,
    chosenAircraft: null,
    retreiveAircrafts: async () => null,
    chooseAircraft: () => null,
    clearChosenAircraft: () => null,
    loading: false,
    cleanUpAircrafts: () => {},
  },
  // Airports
  // Origins
  originsResult: {
    airports: null,
    chosenAirport: null,
    retreiveAirports: async () => null,
    chooseAirport: () => null,
    clearChosenAirport: () => null,
    loading: false,
    cleanUpAirports: () => {},
  },
  // Destinations
  destinationsResult: {
    airports: null,
    chosenAirport: null,
    retreiveAirports: async () => null,
    chooseAirport: () => null,
    clearChosenAirport: () => null,
    loading: false,
    cleanUpAirports: () => {},
  },
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
