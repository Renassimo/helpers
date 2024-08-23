import { FlightData, FlightsState } from '../flightTypes';

export const mockedFlight1: FlightData = {
  id: 'fl1',
  attributes: {
    age: 'age1',
    airline: 'airline1',
    airplaneName: 'airplaneName1',
    altAirline: 'altAirline1',
    altFlightNumber: 'altFlightNumber1',
    cn: 'cn1',
    date: 'date1',
    destination: 'destination1',
    destinationName: 'destinationName1',
    distance: 1111,
    firstFlight: 'firstFlight1',
    flightNumber: 'flightNumber1',
    manufacturer: 'manufacturer1',
    model: 'model1',
    number: 1,
    origin: 'origin1',
    originName: 'originName1',
    photoUrl: 'photoUrl1',
    planespottersUrl: 'planespottersUrl1',
    registration: 'registration1',
    seatNumber: 'seatNumber1',
    title: 'title1',
    url: 'url1',
  },
};

export const mockedFlight2: FlightData = {
  id: 'fl2',
  attributes: {
    age: 'age2',
    airline: 'airline2',
    airplaneName: null,
    altAirline: null,
    altFlightNumber: null,
    cn: 'cn2',
    date: 'date2',
    destination: 'destination2',
    destinationName: 'destinationName2',
    distance: 2222,
    firstFlight: 'firstFlight2',
    flightNumber: 'flightNumber2',
    manufacturer: 'manufacturer2',
    model: 'model2',
    number: 2,
    origin: 'origin2',
    originName: 'originName2',
    photoUrl: 'photoUrl2',
    planespottersUrl: null,
    registration: 'registration2',
    seatNumber: 'seatNumber2',
    title: 'title2',
    url: 'url2',
  },
};

export const mockedFlight3: FlightData = {
  id: 'fl3',
  attributes: {
    age: null,
    airline: 'airline3',
    airplaneName: null,
    altAirline: null,
    altFlightNumber: null,
    cn: null,
    date: 'date3',
    destination: 'destination3',
    destinationName: 'destinationName3',
    distance: 3333,
    firstFlight: null,
    flightNumber: null,
    manufacturer: 'manufacturer3',
    model: 'model3',
    number: 3,
    origin: 'origin3',
    originName: 'originName3',
    photoUrl: null,
    planespottersUrl: null,
    registration: null,
    seatNumber: null,
    title: 'title3',
    url: 'url3',
  },
};

export const mockedFlight: FlightData = mockedFlight1;

export const mockedFlightsList: FlightData[] = [
  mockedFlight1,
  mockedFlight2,
  mockedFlight3,
];

export const mockedFlights: FlightsState = {
  [mockedFlight1.id]: mockedFlight1,
  [mockedFlight2.id]: mockedFlight2,
  [mockedFlight3.id]: mockedFlight3,
};
