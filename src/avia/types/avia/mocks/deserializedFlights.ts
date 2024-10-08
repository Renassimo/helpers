import { Avia } from '../avia';

export const mockedDeserializedFlights: Avia.FlightData[] = [
  {
    id: 'FZ 1839__2024-08-24',
    attributes: {
      flightNumber: 'FZ 1839',
      origin: 'DXB/OMDB',
      originName: 'Dubai',
      destination: 'WAW/EPWA',
      destinationName: 'Warsaw Chopin',
      distance: 4157,
      date: '2024-08-24',
      airline: 'flydubai',
      aircraft: 'Boeing 737 MAX 8',
      registration: 'A6-FMB',
      photoUrl:
        'https://farm66.staticflickr.com/65535/51788228697_3c96482599_z.jpg',
      originLocation: {
        lat: 25.252798,
        lon: 55.3644,
      },
      destinationLocation: {
        lat: 52.1657,
        lon: 20.9671,
      },
    },
  },
];
