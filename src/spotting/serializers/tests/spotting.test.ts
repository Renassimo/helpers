import { NotionResult } from '@/common/types/notion';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import {
  deserializeSpottedPlanes,
  serializeSpottedPlanes,
} from '@/spotting/serializers';

jest.mock('@/common/serializers/notion');

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
});
