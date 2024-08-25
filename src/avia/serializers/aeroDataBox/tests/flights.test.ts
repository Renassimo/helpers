import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import { mockedFlights } from '@/avia/types/aeroDataBox/mocks';

import { deserializeFlights } from '../flights';

describe('Flights serializers', () => {
  describe('deserializeFlights ', () => {
    test('deserializes results', () => {
      // Arrange
      const expectedResult = [
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
          },
        },
      ];
      // Act
      const result = deserializeFlights(mockedFlights);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    describe('when optional params did not passed ', () => {
      test('deserializes results', () => {
        // Arrange
        const [mockedFlight] = mockedFlights;
        const mockedResult = {
          ...mockedFlight,
          aircraft: undefined,
          airline: undefined,
        } as AeroDataBoxApi.Flight;
        const expectedResult = [
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
              airline: null,
              aircraft: null,
              registration: null,
              photoUrl: null,
            },
          },
        ];
        // Act
        const result = deserializeFlights([mockedResult]);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
