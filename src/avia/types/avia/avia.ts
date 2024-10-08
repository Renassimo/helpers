import { Matcher } from '@/common/types/matchers';
import { ApiData, Data } from '@/common/types/props';

export namespace Avia {
  interface Location {
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
}
