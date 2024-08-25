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
  number: number;
}

export interface MyFlightData {
  id: string;
  attributes: MyFlightAttributes;
}

export interface MyFlightsState {
  [id: string]: MyFlightData;
}

export interface FlightsContextData {
  // Flights data
  flights: MyFlightsState;
  flightsList: MyFlightData[];
  updateFlight: (flight: MyFlightData) => void;
}
