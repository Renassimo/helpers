import { createContext } from 'react';

import { MyFlightsContextData } from '@/myFlights/types';

const MyFlightsContext = createContext<MyFlightsContextData>({
  // Flights data
  myFlights: {},
  myFlightsList: [],
  updateMyFlight: () => {},
  // Options
  options: null,
  // Flights
  flightsResult: {
    flights: null,
    chosenFlight: null,
    retreiveFlights: async () => null,
    chooseFlight: () => null,
    clearChosenFlight: () => null,
  },
  // Aircrafts
  aircraftsResult: {
    aircrafts: null,
    chosenAircraft: null,
    retreiveAircrafts: async () => null,
    chooseAircraft: () => null,
    clearChosenAircraft: () => null,
  },
  // Airports
  airportsResult: {
    airports: null,
    chosenAirport: null,
    retreiveAirports: async () => null,
    chooseAirport: () => null,
    clearChosenAirport: () => null,
  },
});

export default MyFlightsContext;
