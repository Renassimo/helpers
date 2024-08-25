import { NotionResult } from '@/common/types/notion';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import { deserializeFlights } from '../flights';

jest.mock('@/common/serializers/notion');

describe('Flights serializers', () => {
  describe('deserializeFlights ', () => {
    const mockedResults = [{ mockedResult1: 'mockedResult1' }];

    const mockedId = 'mockedPhotoUrl1';
    const mockedUrl = 'mockedUrl';
    const mockedCover = 'mockedCover';
    const mockedTextAttribute = 'mockedTextAttribute';
    const mockedSelectAttribute = 'mockedSelectAttribute';
    const mockedDateAttribute = 'mockedDateAttribute';
    const mockedNumberAttribute = 'mockedCheckboxAttribute';
    const mockedUrlAttribute = 'mockedUrlAttribute';

    const mockedGetTextAttribute = jest.fn(() => mockedTextAttribute);
    const mockedGetSelectAttribute = jest.fn(() => mockedSelectAttribute);
    const mockedGetDateAttribute = jest.fn(() => mockedDateAttribute);
    const mockedGetNumberAttribute = jest.fn(() => mockedNumberAttribute);
    const mockedGetUrlAttribute = jest.fn(() => mockedUrlAttribute);

    beforeEach(() => {
      (
        NotionPropertiesDeserializer as unknown as jest.Mock
      ).mockImplementationOnce(() => ({
        getTextAttribute: mockedGetTextAttribute,
        getSelectAttribute: mockedGetSelectAttribute,
        getDateAttribute: mockedGetDateAttribute,
        getNumberAttribute: mockedGetNumberAttribute,
        getUrlAttribute: mockedGetUrlAttribute,
        id: mockedId,
        url: mockedUrl,
        cover: mockedCover,
      }));
    });

    test('deserializes results', () => {
      // Arrange
      const expectedResult = [
        {
          id: mockedId,
          attributes: {
            title: mockedTextAttribute,
            date: mockedDateAttribute,
            airline: mockedSelectAttribute,
            flightNumber: mockedTextAttribute,
            origin: mockedSelectAttribute,
            destination: mockedSelectAttribute,
            manufacturer: mockedSelectAttribute,
            model: mockedSelectAttribute,
            registration: mockedTextAttribute,
            cn: mockedTextAttribute,
            firstFlight: mockedDateAttribute,
            airplaneName: mockedTextAttribute,
            originName: mockedTextAttribute,
            destinationName: mockedTextAttribute,
            seatNumber: mockedTextAttribute,
            altAirline: mockedSelectAttribute,
            altFlightNumber: mockedTextAttribute,
            planespottersUrl: mockedUrlAttribute,
            distance: mockedNumberAttribute,
            age: mockedTextAttribute,
            url: mockedUrl,
            photoUrl: mockedCover,
            number: 1,
          },
        },
      ];
      // Act
      const result = deserializeFlights(
        mockedResults as unknown as NotionResult[]
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedGetTextAttribute).toHaveBeenCalledTimes(10);
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(1, 'Name', true);
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(
        2,
        'Flight number'
      );
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(3, 'Registration');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(4, 'CN / MSN');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(
        5,
        'Airplane name'
      );
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(6, 'Origin name');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(
        7,
        'Destination name'
      );
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(8, 'Seat number');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(
        9,
        'Alt flight number'
      );
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(10, 'Age');
      expect(mockedGetSelectAttribute).toHaveBeenCalledTimes(6);
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(1, 'Airline');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(2, 'Origin');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(
        3,
        'Destination'
      );
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(
        4,
        'Manufacturer'
      );
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(5, 'Model');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(
        6,
        'Alt airline'
      );
      expect(mockedGetDateAttribute).toHaveBeenCalledTimes(2);
      expect(mockedGetDateAttribute).toHaveBeenNthCalledWith(1, 'Date');
      expect(mockedGetDateAttribute).toHaveBeenNthCalledWith(2, 'First flight');
      expect(mockedGetNumberAttribute).toHaveBeenCalledTimes(1);
      expect(mockedGetNumberAttribute).toHaveBeenNthCalledWith(
        1,
        'Distance, km'
      );
      expect(mockedGetUrlAttribute).toHaveBeenCalledTimes(1);
      expect(mockedGetUrlAttribute).toHaveBeenNthCalledWith(
        1,
        'Planespotters URL'
      );
    });
  });
});
