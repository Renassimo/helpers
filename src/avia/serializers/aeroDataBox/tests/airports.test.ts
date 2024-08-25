import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import { mockedAirports } from '@/avia/types/aeroDataBox/mocks';

import { deserializeAirports } from '../airports';

describe('Flights serializers', () => {
  describe('deserializeFlights ', () => {
    test('deserializes results', () => {
      // Arrange
      const expectedResult = [
        {
          id: 'KZN/UWKD',
          attributes: {
            airportCode: 'KZN/UWKD',
            airportName: 'Kazan ',
            municipalityName: 'Kazan',
            shortName: 'Kazan',
          },
        },
        {
          id: 'WAW/EPWA',
          attributes: {
            airportCode: 'WAW/EPWA',
            airportName: 'Warsaw Chopin',
            municipalityName: 'Warsaw',
            shortName: 'Chopin',
          },
        },
      ];
      // Act
      const result = deserializeAirports(mockedAirports);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when optional params did not passed ', () => {
    test('deserializes results', () => {
      // Arrange
      const [mockedAirport1, mockedAirport2] = mockedAirports;
      const mockedResult = [
        {
          ...mockedAirport1,
          name: undefined,
          municipalityName: undefined,
          shortName: undefined,
        } as AeroDataBoxApi.Airport,
        {
          ...mockedAirport2,
          fullName: undefined,
          municipalityName: undefined,
          shortName: undefined,
        } as AeroDataBoxApi.AirportExact,
      ];
      const expectedResult = [
        {
          id: 'KZN/UWKD',
          attributes: {
            airportCode: 'KZN/UWKD',
            airportName: null,
            municipalityName: null,
            shortName: null,
          },
        },
        {
          id: 'WAW/EPWA',
          attributes: {
            airportCode: 'WAW/EPWA',
            airportName: null,
            municipalityName: null,
            shortName: null,
          },
        },
      ];
      // Act
      const result = deserializeAirports(mockedResult);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
