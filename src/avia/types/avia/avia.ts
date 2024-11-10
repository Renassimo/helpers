import { Matcher } from '@/common/types/matchers';
import { ApiData, Data } from '@/common/types/props';

export namespace Avia {
  export interface Location {
    lat: number;
    lon: number;
  }

  export interface FlightAttributes {
    flightNumber: string;
    origin: string;
    originName: string;
    destination: string;
    destinationName: string;
    originLocation: Location | null;
    destinationLocation: Location | null;
    distance: number | null;
    date: string;
    airline: string | null;
    aircraft: string | null;
    registration: string | null;
    photoUrl: string | null;
  }

  export type FlightData = Data<FlightAttributes>;

  export type FlightsApiData = ApiData<FlightData[]>;

  export interface AirportAttributes {
    airportCode: string;
    airportName: string | null;
    municipalityName: string | null;
    shortName: string | null;
    location: Location | null;
  }

  export type AirportData = Data<AirportAttributes>;

  export type AirportsApiData = ApiData<AirportData[]>;

  export interface AircraftAttributes {
    registration: string;
    serial: string | null;
    airlineName: string | null;
    modelCode: string | null;
    model: string | null;
    typeName: string | null;
    productionLine: string | null;
    isFreighter: boolean | null;
    firstFlightDate: string | null;
    rolloutDate: string | null;
    deliveryDate: string | null;
    photoUrl: string | null;
    airplaneName: string | null;
    source: 'myFlights' | 'spotted' | 'aerodatabox' | null;
  }

  export type AircraftData = Data<AircraftAttributes>;

  export type AircraftApiData = ApiData<AircraftData[]>;

  export interface Options {
    airlines: string[];
    airports: string[];
    manufacturers: string[];
    models: string[];
  }

  export interface Matchers {
    airlines: Matcher;
    airports: Matcher;
    manufacturers: Matcher;
    models: Matcher;
  }

  export interface AircraftsResult {
    aircrafts: AircraftData[] | null;
    chosenAircraft: AircraftData | null;
    retreiveAircrafts: (
      flightNumber: string,
      useOwnDB?: boolean
    ) => Promise<AircraftApiData | null>;
    chooseAircraft: (id: string) => AircraftData | null;
    clearChosenAircraft: () => null;
    loading: boolean;
    cleanUpAircrafts: () => void;
  }

  export interface AirportsResult {
    airports: AirportData[] | null;
    chosenAirport: AirportData | null;
    retreiveAirports: (
      props: RetrieveAirportsProps
    ) => Promise<AirportsApiData | null>;
    chooseAirport: (id: string) => AirportData | null;
    clearChosenAirport: () => null;
    loading: boolean;
    cleanUpAirports: () => void;
  }

  export interface FlightsResult {
    flights: Avia.FlightData[] | null;
    chosenFlight: Avia.FlightData | null;
    retreiveFlights: (
      flightNumber: string,
      date?: string | null
    ) => Promise<Avia.FlightsApiData | null>;
    chooseFlight: (id: string) => Avia.FlightData | null;
    clearChosenFlight: () => null;
    loading: boolean;
    cleanUpFlights: () => void;
  }

  export interface RetrieveAirportsProps {
    code?: string;
    text?: string;
    lat?: string;
    lon?: string;
  }

  export interface FormFieldProps<Attributes> {
    name: Extract<keyof Attributes, string>;
    label: string;
    options?: string[];
    matchers?: Matcher;
    type?: string;
    disabled?: boolean;
    isDate?: boolean;
  }
}

export const defaultFlightsResult = {
  flights: null,
  chosenFlight: null,
  retreiveFlights: async () => null,
  chooseFlight: () => null,
  clearChosenFlight: () => null,
  loading: false,
  cleanUpFlights: () => {},
};

export const defaultAircraftsResult = {
  aircrafts: null,
  chosenAircraft: null,
  retreiveAircrafts: async () => null,
  chooseAircraft: () => null,
  clearChosenAircraft: () => null,
  loading: false,
  cleanUpAircrafts: () => {},
};

export const defaultAirportsResult = {
  airports: null,
  chosenAirport: null,
  retreiveAirports: async () => null,
  chooseAirport: () => null,
  clearChosenAirport: () => null,
  loading: false,
  cleanUpAirports: () => {},
};
