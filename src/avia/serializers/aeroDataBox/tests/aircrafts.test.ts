import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import { mockedAircrafts } from '@/avia/types/aeroDataBox/mocks';

import { deserializeAircrafts } from '../aircrafts';

describe('Airports serializers', () => {
  describe('deserializeAirports ', () => {
    test('deserializes results', () => {
      // Arrange
      const expectedResult = [
        {
          id: '9559',
          attributes: {
            registration: 'VP-BQX',
            serial: '2957',
            airlineName: 'Aeroflot',
            modelCode: '321-211',
            model: 'A321',
            typeName: 'Airbus A321',
            productionLine: 'Airbus A321',
            isFreighter: false,
            firstFlightDate: '2006-11-24',
            rolloutDate: '2006-11-24',
            deliveryDate: '2006-12-06',
            photoUrl:
              'https://farm66.staticflickr.com/65535/49793557276_d983c0beb5_z.jpg',
          },
        },
      ];
      // Act
      const result = deserializeAircrafts(mockedAircrafts);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when receives duplicates', () => {
      test('deserializes only unique results', () => {
        // Arrange
        const expectedResult = [
          {
            id: '9559',
            attributes: {
              registration: 'VP-BQX',
              serial: '2957',
              airlineName: 'Aeroflot',
              modelCode: '321-211',
              model: 'A321',
              typeName: 'Airbus A321',
              productionLine: 'Airbus A321',
              isFreighter: false,
              firstFlightDate: '2006-11-24',
              rolloutDate: '2006-11-24',
              deliveryDate: '2006-12-06',
              photoUrl:
                'https://farm66.staticflickr.com/65535/49793557276_d983c0beb5_z.jpg',
            },
          },
        ];
        // Act
        const result = deserializeAircrafts([
          mockedAircrafts[0],
          mockedAircrafts[0],
        ]);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when optional params did not passed ', () => {
      test('deserializes results', () => {
        // Arrange
        const mockedResult = [
          {
            id: 9559,
            reg: 'VP-BQX',
          } as AeroDataBoxApi.Aircraft,
        ];
        const expectedResult = [
          {
            id: '9559',
            attributes: {
              registration: 'VP-BQX',
              serial: null,
              airlineName: null,
              modelCode: null,
              model: null,
              typeName: null,
              productionLine: null,
              isFreighter: null,
              firstFlightDate: null,
              rolloutDate: null,
              deliveryDate: null,
              photoUrl: null,
            },
          },
        ];
        // Act
        const result = deserializeAircrafts(mockedResult);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
