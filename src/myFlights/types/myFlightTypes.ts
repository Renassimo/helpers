import { Avia } from '@/avia/types/avia';
import {
  UseAircraftsResult,
  UseAirportsResult,
  UseFlightsResult,
  UseMyFlightFormResult,
} from './props';

export interface MyFlightAttributes {
  title: string | null;
  date: string | null;
  airline: string | null;
  flightNumber: string | null;
  origin: string | null;
  destination: string | null;
  manufacturer: string | null;
  model: string | null;
  registration: string | null;
  cn: string | null;
  firstFlight: string | null;
  airplaneName: string | null;
  originName: string | null;
  destinationName: string | null;
  seatNumber: string | null;
  altAirline: string | null;
  altFlightNumber: string | null;
  planespottersUrl: string | null;
  distance: number | null;
  age: string | null;
  url: string;
  photoUrl: string | null;
  number: number | null;
}

export interface MyFlightData {
  id: string;
  attributes: MyFlightAttributes;
}

export interface MyFlightsState {
  [id: string]: MyFlightData;
}

export interface MyFlightsContextData {
  // Flights data
  myFlights: MyFlightsState;
  myFlightsList: MyFlightData[];
  updateMyFlight: (flight: MyFlightData) => void;
  // Options
  options: Avia.Options | null;
  // Matchers
  matchers: Avia.Matchers | null;
  // Flights
  flightsResult: UseFlightsResult;
  // Aircrafts
  aircraftsResult: UseAircraftsResult;
  // Airports
  originsResult: UseAirportsResult;
  destinationsResult: UseAirportsResult;
  // CleanUp
  cleanUp: () => void;
  // Loaded values
  loadedValues: Partial<MyFlightAttributes>;
  // My Flight Form
  myFlightForm: UseMyFlightFormResult;
}
