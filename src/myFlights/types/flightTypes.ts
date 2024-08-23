export interface FlightAttributes {
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
  number: number;
}

export interface FlightData {
  id: string;
  attributes: FlightAttributes;
}

export interface FlightsState {
  [id: string]: FlightData;
}

export interface FlightsContextData {
  // Flights data
  flights: FlightsState;
  flightsList: FlightData[];
  updateFlight: (flight: FlightData) => void;
}
