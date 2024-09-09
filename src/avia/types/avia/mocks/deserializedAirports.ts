import { Avia } from '../avia';

export const mockedDeserializedAirports: Avia.AirportData[] = [
  {
    id: 'WAW/EPWA',
    attributes: {
      airportCode: 'WAW/EPWA',
      airportName: 'Warsaw Chopin',
      municipalityName: 'Warsaw',
      shortName: 'Chopin',
      location: {
        lat: 52.1657,
        lon: 20.9671,
      },
    },
  },
  {
    id: 'KZN/UWKD',
    attributes: {
      airportCode: 'KZN/UWKD',
      airportName: null,
      municipalityName: null,
      shortName: null,
      location: null,
    },
  },
];
