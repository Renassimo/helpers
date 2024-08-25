import { Data } from '@/common/types/props';

export namespace Avia {
  export interface FlightAttributes {
    flightNumber: string;
    origin: string;
    originName: string | null;
    destination: string;
    destinationName: string | null;
    distance: number;
    date: string;
    airline: string | null;
    aircraft: string | null;
    registration: string | null;
    photoUrl: string | null;
  }

  export type FlightData = Data<FlightAttributes>;

  export interface AirportAttributes {
    airportCode: string;
    airportName: string | null;
    municipalityName: string | null;
    shortName: string | null;
  }

  export type AirportData = Data<AirportAttributes>;

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
}
