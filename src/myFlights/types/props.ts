import { Avia } from '@/avia/types/avia';
import { MyFlightAttributes, MyFlightData } from './myFlightTypes';

export interface RetrieveAirportsProps {
  code?: string;
  text?: string;
  lat?: string;
  lon?: string;
}

export interface UseFlightsResult {
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

export interface UseAircraftsResult {
  aircrafts: Avia.AircraftData[] | null;
  chosenAircraft: Avia.AircraftData | null;
  retreiveAircrafts: (
    flightNumber: string
  ) => Promise<Avia.AircraftApiData | null>;
  chooseAircraft: (id: string) => Avia.AircraftData | null;
  clearChosenAircraft: () => null;
  loading: boolean;
  cleanUpAircrafts: () => void;
}

export interface UseAirportsResult {
  airports: Avia.AirportData[] | null;
  chosenAirport: Avia.AirportData | null;
  retreiveAirports: (
    props: RetrieveAirportsProps
  ) => Promise<Avia.AirportsApiData | null>;
  chooseAirport: (id: string) => Avia.AirportData | null;
  clearChosenAirport: () => null;
  loading: boolean;
  cleanUpAirports: () => void;
}

export interface UseMyFlightFormResult {
  isModalOpen: boolean;
  openModal: (data?: MyFlightData | null, isReturn?: boolean) => void;
  closeModal: () => void;
  state: Partial<MyFlightAttributes>;
  setValue: (key: string, value: string | number | null) => void;
  isEditing: boolean;
  onSubmit: () => Promise<void>;
  onDelete: () => Promise<void>;
  loading: boolean;
}
