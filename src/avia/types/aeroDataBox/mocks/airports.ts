import { AeroDataBoxApi } from '../aeroDataBox';

export const mockedAirports: (
  | AeroDataBoxApi.Airport
  | AeroDataBoxApi.AirportExact
)[] = [
  {
    icao: 'UWKD',
    iata: 'KZN',
    name: 'Kazan ',
    shortName: 'Kazan',
    municipalityName: 'Kazan',
    location: {
      lat: 55.6062,
      lon: 49.2787,
    },
    countryCode: 'RU',
    timeZone: 'Europe/Moscow',
  } as AeroDataBoxApi.Airport,
  {
    icao: 'EPWA',
    iata: 'WAW',
    shortName: 'Chopin',
    fullName: 'Warsaw Chopin',
    municipalityName: 'Warsaw',
    location: {
      lat: 52.1657,
      lon: 20.9671,
    },
    timeZone: 'Europe/Warsaw',
  } as AeroDataBoxApi.AirportExact,
];
