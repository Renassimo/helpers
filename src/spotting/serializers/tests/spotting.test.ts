import { NotionResult } from '@/common/types/notion';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import NotionPropertiesSerializer from '@/common/serializers/notion/propertiesSerializer';
import {
  deserializePhotoInfo,
  deserializeSpottedPlanes,
  serializePhotoInfo,
  serializeSpottedPlanes,
} from '@/spotting/serializers';
import { PhotoFolderInfoData } from '@/spotting/types';

jest.mock('@/common/serializers/notion');
jest.mock('@/common/serializers/notion/propertiesSerializer');

describe('Spotting serializers', () => {
  describe('deserializeSpottedPlanes ', () => {
    const mockedResults = [{ mockedResult1: 'mockedResult1' }];
    const mockedPhotoUrls = { mockedPhotoUrl1: 'mockedPhotoUrl1' };

    const mockedId = 'mockedPhotoUrl1';
    const mockedUrl = 'mockedUrl';
    const mockedTextAttribute = 'mockedTextAttribute';
    const mockedSelectAttribute = 'mockedSelectAttribute';
    const mockedDateAttribute = 'mockedDateAttribute';
    const mockedCheckboxAttribute = 'mockedCheckboxAttribute';
    const mockedUrlAttribute = 'mockedUrlAttribute';

    const mockedGetTextAttribute = jest.fn(() => mockedTextAttribute);
    const mockedGetSelectAttribute = jest.fn(() => mockedSelectAttribute);
    const mockedGetDateAttribute = jest.fn(() => mockedDateAttribute);
    const mockedGetCheckboxAttribute = jest.fn(() => mockedCheckboxAttribute);
    const mockedGetUrlAttribute = jest.fn(() => mockedUrlAttribute);

    beforeEach(() => {
      (
        NotionPropertiesDeserializer as unknown as jest.Mock
      ).mockImplementationOnce(() => ({
        getTextAttribute: mockedGetTextAttribute,
        getSelectAttribute: mockedGetSelectAttribute,
        getDateAttribute: mockedGetDateAttribute,
        getCheckboxAttribute: mockedGetCheckboxAttribute,
        getUrlAttribute: mockedGetUrlAttribute,
        id: mockedId,
        url: mockedUrl,
      }));
    });

    test('deserializes results', () => {
      // Arrange
      const expectedResult = [
        {
          id: mockedId,
          attributes: {
            airplaneName: mockedTextAttribute,
            carrier: mockedSelectAttribute,
            cn: mockedTextAttribute,
            firstFlight: mockedDateAttribute,
            flown: mockedCheckboxAttribute,
            groupPost: mockedCheckboxAttribute,
            manufacturer: mockedSelectAttribute,
            model: mockedSelectAttribute,
            modelled: mockedCheckboxAttribute,
            name: mockedTextAttribute,
            photoUrl: mockedPhotoUrls.mockedPhotoUrl1,
            photosUrl: mockedUrlAttribute,
            place: mockedSelectAttribute,
            planespottersUrl: mockedUrlAttribute,
            registration: mockedTextAttribute,
            spottedDate: mockedDateAttribute,
            url: mockedUrl,
          },
        },
      ];
      // Act
      const result = deserializeSpottedPlanes(
        mockedResults as unknown as NotionResult[],
        mockedPhotoUrls
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedGetTextAttribute).toHaveBeenCalledTimes(4);
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(
        1,
        'Airplane Name / Marks'
      );
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(2, 'CN / MSN');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(3, 'Name', true);
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(4, 'Registration');
      expect(mockedGetSelectAttribute).toHaveBeenCalledTimes(4);
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(1, 'Carrier');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(
        2,
        'Manufacturer'
      );
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(3, 'Model');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(4, 'Place');
      expect(mockedGetDateAttribute).toHaveBeenCalledTimes(2);
      expect(mockedGetDateAttribute).toHaveBeenNthCalledWith(1, 'First flight');
      expect(mockedGetDateAttribute).toHaveBeenNthCalledWith(2, 'Spotted date');
      expect(mockedGetCheckboxAttribute).toHaveBeenCalledTimes(3);
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(1, 'Flown');
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(
        2,
        'Group post'
      );
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(3, 'Modelled');
      expect(mockedGetUrlAttribute).toHaveBeenCalledTimes(2);
      expect(mockedGetUrlAttribute).toHaveBeenNthCalledWith(1, 'Photos URL');
      expect(mockedGetUrlAttribute).toHaveBeenNthCalledWith(
        2,
        'Planespotters URL'
      );
    });
  });

  describe('serializeSpottedPlanes', () => {
    const mockedId1 = 'mocked-id-1';
    const mockedDescription1 = 'Mocked description 1';
    const mockedHashtags1 = '#Mocked #hashtags1';
    const mockedNewFirstFlight1 = '2020-01-01';
    const mockedGroupName1 = 'Group name';
    const mockedGroupDescription1 = 'Group description 1';
    const mockedGroupHashtags1 = '#Group #hashtags1';
    const mockedId2 = 'mocked-id-2';
    const mockedDescription2 = 'Mocked description 2';
    const mockedHashtags2 = '#Mocked #hashtags2';

    const data = [
      {
        id: mockedId1,
        attributes: {
          description: mockedDescription1,
          hashtags: mockedHashtags1,
          newFirstFlight: mockedNewFirstFlight1,
          groupName: mockedGroupName1,
          groupDescription: mockedGroupDescription1,
          groupHashtags: mockedGroupHashtags1,
        },
      },
      {
        id: mockedId2,
        attributes: {
          description: mockedDescription2,
          hashtags: mockedHashtags2,
        },
      },
    ];

    test('returns serialized data', () => {
      // Arrange
      const expectedResult = [
        {
          id: mockedId1,
          body: {
            icon: { type: 'emoji', emoji: '✈️' },
            properties: {
              'Ready to publish': {
                checkbox: true,
              },
              Text: {
                type: 'rich_text',
                rich_text: [
                  {
                    text: {
                      content: `${mockedDescription1}\n\n${mockedHashtags1}`,
                    },
                  },
                ],
              },
              'First flight': { date: { start: mockedNewFirstFlight1 } },
              'Group post': { checkbox: true },
              'Group text': {
                type: 'rich_text',
                rich_text: [
                  {
                    text: {
                      content: `${mockedGroupDescription1}\n\n${mockedGroupHashtags1}`,
                    },
                  },
                ],
              },
              Group: { select: { name: mockedGroupName1 } },
            },
          },
        },
        {
          id: mockedId2,
          body: {
            icon: { type: 'emoji', emoji: '✈️' },
            properties: {
              'Ready to publish': {
                checkbox: true,
              },
              Text: {
                type: 'rich_text',
                rich_text: [
                  {
                    text: {
                      content: `${mockedDescription2}\n\n${mockedHashtags2}`,
                    },
                  },
                ],
              },
            },
          },
        },
      ];
      // Act
      const result = serializeSpottedPlanes(data);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('serializePhotoInfo', () => {
    const getRichText = jest.fn((key, attr) => ({ [key]: attr }));
    const getDate = jest.fn((key, attr) => ({ [key]: attr }));
    const getSelect = jest.fn((key, attr) => ({ [key]: attr }));
    const getUrl = jest.fn((key, attr) => ({ [key]: attr }));
    const getUrlCover = jest.fn((attr) => ({ urlCover: attr }));
    const getNumber = jest.fn((key, attr) => ({ [key]: attr }));
    const getName = jest.fn((attr) => ({ name: attr }));
    const getCheckbox = jest.fn((key, attr) => ({ [key]: attr }));

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
          getCheckbox,
        })
      );
    });

    test('serializes result', () => {
      // Arange
      const mockedPhotoInfo = {
        attributes: {
          title: 'title',
          date: 'date',
          place: 'place',
          photosUrl: 'photosUrl',
          extraLink: 'extraLink',
          planespottersUrl: 'planespottersUrl',
          registration: 'registration',
          carrier: 'carrier',
          manufacturer: 'manufacturer',
          model: 'model',
          firstFlight: 'firstFlight',
          cn: 'cn',
          airplaneName: 'airplaneName',
          flown: 'flown',
          modelled: 'modelled',
          infoReady: 'infoReady',
          readyToPublish: 'readyToPublish',
          rating: 'rating',
          age: 'age',
        },
      } as unknown as PhotoFolderInfoData;
      // Act
      const result = serializePhotoInfo(mockedPhotoInfo);
      // Assert
      expect(NotionPropertiesSerializer).toBeCalledWith(
        mockedPhotoInfo.attributes
      );
      expect(getUrlCover).not.toBeCalled();
      expect(getName).toBeCalledTimes(1);
      expect(getName).nthCalledWith(1, 'title');
      expect(getRichText).toBeCalledTimes(4);
      expect(getRichText).nthCalledWith(1, 'Registration', 'registration');
      expect(getRichText).nthCalledWith(2, 'CN / MSN', 'cn');
      expect(getRichText).nthCalledWith(
        3,
        'Airplane Name / Marks',
        'airplaneName'
      );
      expect(getRichText).nthCalledWith(4, 'Age', 'age');
      expect(getDate).toBeCalledTimes(2);
      expect(getDate).nthCalledWith(1, 'Spotted date', 'date');
      expect(getDate).nthCalledWith(2, 'First flight', 'firstFlight');
      expect(getSelect).toBeCalledTimes(5);
      expect(getSelect).nthCalledWith(1, 'Place', 'place');
      expect(getSelect).nthCalledWith(2, 'Carrier', 'carrier');
      expect(getSelect).nthCalledWith(3, 'Manufacturer', 'manufacturer');
      expect(getSelect).nthCalledWith(4, 'Model', 'model');
      expect(getSelect).nthCalledWith(5, 'Rating', 'rating');
      expect(getNumber).not.toBeCalled();
      expect(getUrl).toBeCalledTimes(3);
      expect(getUrl).nthCalledWith(1, 'Photos URL', 'photosUrl');
      expect(getUrl).nthCalledWith(2, 'Extra link', 'extraLink');
      expect(getUrl).nthCalledWith(3, 'Planespotters URL', 'planespottersUrl');
      expect(getCheckbox).toBeCalledTimes(4);
      expect(getCheckbox).nthCalledWith(1, 'Flown', 'flown');
      expect(getCheckbox).nthCalledWith(2, 'Modelled', 'modelled');
      expect(getCheckbox).nthCalledWith(3, 'Info Ready', 'infoReady');
      expect(getCheckbox).nthCalledWith(
        4,
        'Ready to publish',
        'readyToPublish'
      );
      expect(result).toEqual({
        icon: { type: 'emoji', emoji: '📷' },
        properties: {
          name: 'title',
          'Spotted date': 'date',
          Place: 'place',
          'Photos URL': 'photosUrl',
          'Extra link': 'extraLink',
          'Planespotters URL': 'planespottersUrl',
          Registration: 'registration',
          Carrier: 'carrier',
          Manufacturer: 'manufacturer',
          Model: 'model',
          'First flight': 'firstFlight',
          'CN / MSN': 'cn',
          'Airplane Name / Marks': 'airplaneName',
          Flown: 'flown',
          Modelled: 'modelled',
          'Info Ready': 'infoReady',
          'Ready to publish': 'readyToPublish',
          Rating: 'rating',
          Age: 'age',
        },
      });
    });
  });

  describe('deserializeFlights ', () => {
    const mockedResults = [{ mockedResult1: 'mockedResult1' }];

    const mockedId = 'mockedPhotoUrl1';
    const mockedUrl = 'mockedUrl';
    const mockedCover = 'mockedCover';
    const mockedTextAttribute = 'mockedTextAttribute';
    const mockedSelectAttribute = 'mockedSelectAttribute';
    const mockedDateAttribute = 'mockedDateAttribute';
    const mockedNumberAttribute = 'mockedNumberAttribute';
    const mockedUrlAttribute = 'mockedUrlAttribute';
    const mockedCheckboxAttribute = 'mockedCheckboxAttribute';

    const mockedGetTextAttribute = jest.fn(() => mockedTextAttribute);
    const mockedGetSelectAttribute = jest.fn(() => mockedSelectAttribute);
    const mockedGetDateAttribute = jest.fn(() => mockedDateAttribute);
    const mockedGetNumberAttribute = jest.fn(() => mockedNumberAttribute);
    const mockedGetUrlAttribute = jest.fn(() => mockedUrlAttribute);
    const mockedGetCheckboxAttribute = jest.fn(() => mockedCheckboxAttribute);

    const expectedAttributes = {
      title: mockedTextAttribute,
      date: mockedDateAttribute,
      place: mockedSelectAttribute,
      photosUrl: mockedUrlAttribute,
      extraLink: mockedUrlAttribute,
      planespottersUrl: mockedUrlAttribute,
      registration: mockedTextAttribute,
      carrier: mockedSelectAttribute,
      manufacturer: mockedSelectAttribute,
      model: mockedSelectAttribute,
      firstFlight: mockedDateAttribute,
      cn: mockedTextAttribute,
      airplaneName: mockedTextAttribute,
      flown: mockedCheckboxAttribute,
      modelled: mockedCheckboxAttribute,
      infoReady: mockedCheckboxAttribute,
      readyToPublish: mockedCheckboxAttribute,
      rating: mockedSelectAttribute,
      age: mockedTextAttribute,
      url: mockedUrl,
    };

    beforeEach(() => {
      (NotionPropertiesDeserializer as unknown as jest.Mock).mockImplementation(
        () => ({
          getTextAttribute: mockedGetTextAttribute,
          getSelectAttribute: mockedGetSelectAttribute,
          getDateAttribute: mockedGetDateAttribute,
          getNumberAttribute: mockedGetNumberAttribute,
          getUrlAttribute: mockedGetUrlAttribute,
          getCheckboxAttribute: mockedGetCheckboxAttribute,
          id: mockedId,
          url: mockedUrl,
          cover: mockedCover,
        })
      );
    });

    test('deserializes result', () => {
      // Arrange
      const expectedResult = {
        id: mockedId,
        attributes: { ...expectedAttributes },
      };
      // Act
      const result = deserializePhotoInfo(
        mockedResults as unknown as NotionResult
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedGetTextAttribute).toHaveBeenCalledTimes(5);
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(1, 'Name', true);
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(2, 'Registration');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(3, 'CN / MSN');
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(
        4,
        'Airplane Name / Marks'
      );
      expect(mockedGetTextAttribute).toHaveBeenNthCalledWith(5, 'Age');
      expect(mockedGetSelectAttribute).toHaveBeenCalledTimes(5);
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(1, 'Place');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(2, 'Carrier');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(
        3,
        'Manufacturer'
      );
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(4, 'Model');
      expect(mockedGetSelectAttribute).toHaveBeenNthCalledWith(5, 'Rating');
      expect(mockedGetDateAttribute).toHaveBeenCalledTimes(2);
      expect(mockedGetDateAttribute).toHaveBeenNthCalledWith(1, 'Spotted date');
      expect(mockedGetDateAttribute).toHaveBeenNthCalledWith(2, 'First flight');
      expect(mockedGetNumberAttribute).not.toBeCalled();
      expect(mockedGetUrlAttribute).toHaveBeenCalledTimes(3);
      expect(mockedGetUrlAttribute).toHaveBeenNthCalledWith(1, 'Photos URL');
      expect(mockedGetUrlAttribute).toHaveBeenNthCalledWith(2, 'Extra link');
      expect(mockedGetUrlAttribute).toHaveBeenNthCalledWith(
        3,
        'Planespotters URL'
      );
      expect(mockedGetCheckboxAttribute).toHaveBeenCalledTimes(4);
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(1, 'Flown');
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(2, 'Modelled');
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(
        3,
        'Info Ready'
      );
      expect(mockedGetCheckboxAttribute).toHaveBeenNthCalledWith(
        4,
        'Ready to publish'
      );
    });
  });
});
