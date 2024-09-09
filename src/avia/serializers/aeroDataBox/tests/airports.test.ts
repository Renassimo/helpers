import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import { mockedAirports } from '@/avia/types/aeroDataBox/mocks';

import { deserializeAirports } from '../airports';

describe('Airports serializers', () => {
  describe('deserializeAirports ', () => {
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
            location: {
              lat: 55.6062,
              lon: 49.2787,
            },
          },
        },
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
      ];
      // Act
      const result = deserializeAirports(mockedAirports);
      // Assert
      expect(result).toEqual(expectedResult);
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
            location: undefined,
          } as AeroDataBoxApi.Airport,
          {
            ...mockedAirport2,
            fullName: undefined,
            municipalityName: undefined,
            shortName: undefined,
            location: undefined,
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
              location: null,
            },
          },
          {
            id: 'WAW/EPWA',
            attributes: {
              airportCode: 'WAW/EPWA',
              airportName: null,
              municipalityName: null,
              shortName: null,
              location: null,
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
});
