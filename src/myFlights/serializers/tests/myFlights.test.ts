import { NotionResult } from '@/common/types/notion';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import NotionPropertiesSerializer from '@/common/serializers/notion/propertiesSerializer';
import { deserializeMyFlights, serializeMyFlight } from '../myFlights';
import { mockedMyFlight } from '@/myFlights/types/mocks';

jest.mock('@/common/serializers/notion');
jest.mock('@/common/serializers/notion/propertiesSerializer');

describe('Flights serializers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

    const expectedAttributes = {
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
      number: null,
    };

    beforeEach(() => {
      (NotionPropertiesDeserializer as unknown as jest.Mock).mockImplementation(
        () => ({
          getTextAttribute: mockedGetTextAttribute,
          getSelectAttribute: mockedGetSelectAttribute,
          getDateAttribute: mockedGetDateAttribute,
          getNumberAttribute: mockedGetNumberAttribute,
          getUrlAttribute: mockedGetUrlAttribute,
          id: mockedId,
          url: mockedUrl,
          cover: mockedCover,
        })
      );
    });

    test('deserializes result', () => {
      // Arrange
      const expectedResult = [
        {
          id: mockedId,
          attributes: { ...expectedAttributes },
        },
      ];
      // Act
      const result = deserializeMyFlights(
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

    describe('when length is mpre than 1', () => {
      test('deserializes results', () => {
        // Arrange
        const expectedResult = [
          {
            id: mockedId,
            attributes: {
              ...expectedAttributes,
              number: 1,
            },
          },
          {
            id: mockedId,
            attributes: {
              ...expectedAttributes,
              number: 2,
            },
          },
        ];
        // Act
        const result = deserializeMyFlights([
          { mockedResult1: 'mockedResult1' },
          { mockedResult2: 'mockedResult2' },
        ] as unknown as NotionResult[]);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('serializeFlight', () => {
    const getRichText = jest.fn((key, attr) => ({ [key]: attr }));
    const getDate = jest.fn((key, attr) => ({ [key]: attr }));
    const getSelect = jest.fn((key, attr) => ({ [key]: attr }));
    const getUrl = jest.fn((key, attr) => ({ [key]: attr }));
    const getUrlCover = jest.fn((attr) => ({ urlCover: attr }));
    const getNumber = jest.fn((key, attr) => ({ [key]: attr }));
    const getName = jest.fn((attr) => ({ name: attr }));

    beforeEach(() => {
      (NotionPropertiesSerializer as unknown as jest.Mock).mockImplementation(
        () => ({
          getRichText,
          getDate,
          getSelect,
          getUrl,
          getUrlCover,
          getNumber,
          getName,
        })
      );
    });

    test('serializes result', () => {
      // Arange
      // Act
      const result = serializeMyFlight(mockedMyFlight);
      // Assert
      expect(NotionPropertiesSerializer).toBeCalledWith(
        mockedMyFlight.attributes
      );
      expect(getUrlCover).toBeCalledTimes(1);
      expect(getUrlCover).nthCalledWith(1, 'photoUrl');
      expect(getName).toBeCalledTimes(1);
      expect(getName).nthCalledWith(1, 'title');
      expect(getRichText).toBeCalledTimes(9);
      expect(getRichText).nthCalledWith(1, 'Age', 'age');
      expect(getRichText).nthCalledWith(2, 'Seat number', 'seatNumber');
      expect(getRichText).nthCalledWith(
        3,
        'Destination name',
        'destinationName'
      );
      expect(getRichText).nthCalledWith(4, 'Flight number', 'flightNumber');
      expect(getRichText).nthCalledWith(5, 'Airplane name', 'airplaneName');
      expect(getRichText).nthCalledWith(6, 'CN / MSN', 'cn');
      expect(getRichText).nthCalledWith(7, 'Registration', 'registration');
      expect(getRichText).nthCalledWith(8, 'Origin name', 'originName');
      expect(getRichText).nthCalledWith(
        9,
        'Alt flight number',
        'altFlightNumber'
      );
      expect(getDate).toBeCalledTimes(2);
      expect(getDate).nthCalledWith(1, 'First flight', 'firstFlight');
      expect(getDate).nthCalledWith(2, 'Date', 'date');
      expect(getSelect).toBeCalledTimes(6);
      expect(getSelect).nthCalledWith(1, 'Origin', 'origin');
      expect(getSelect).nthCalledWith(2, 'Destination', 'destination');
      expect(getSelect).nthCalledWith(3, 'Airline', 'airline');
      expect(getSelect).nthCalledWith(4, 'Manufacturer', 'manufacturer');
      expect(getSelect).nthCalledWith(5, 'Alt airline', 'altAirline');
      expect(getSelect).nthCalledWith(6, 'Model', 'model');
      expect(getNumber).toBeCalledTimes(1);
      expect(getNumber).nthCalledWith(1, 'Distance, km', 'distance');
      expect(getUrl).toBeCalledTimes(1);
      expect(getUrl).nthCalledWith(1, 'Planespotters URL', 'planespottersUrl');
      expect(result).toEqual({
        icon: { type: 'emoji', emoji: '✈️' },
        urlCover: 'photoUrl',
        properties: {
          name: 'title',
          Age: 'age',
          'Seat number': 'seatNumber',
          'Destination name': 'destinationName',
          'Flight number': 'flightNumber',
          'Airplane name': 'airplaneName',
          'CN / MSN': 'cn',
          Registration: 'registration',
          'Origin name': 'originName',
          'Alt flight number': 'altFlightNumber',
          'First flight': 'firstFlight',
          Date: 'date',
          Origin: 'origin',
          Destination: 'destination',
          Airline: 'airline',
          Manufacturer: 'manufacturer',
          'Alt airline': 'altAirline',
          Model: 'model',
          'Distance, km': 'distance',
          'Planespotters URL': 'planespottersUrl',
        },
      });
    });
  });
});
