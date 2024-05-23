import NotionService from '@/services/notion';

import getSpottedPlanes from '@/spotting/handlers/getSpottedPlanes';

import { deserializeSpottedPlanes } from '@/serializers/spotting';

jest.mock('@/serializers/spotting');
jest.mock('@/services/notion');

describe('getSpottedPlanes', () => {
  let mockedOk: boolean;
  let mockedData: object;
  let mockedChildrenData: object;

  const mockedDataBaseID = 'mocked_data_base_id';
  const mockedToken = 'mocked_token';
  const mockedDeserializedData = { data: 'some deserialized data' };
  const mockedDataToDeserialize = { data: 'some data to deserialize' };
  const mockedChildrenDataToDeserialize = {
    type: 'image',
    parent: {
      page_id: 'page_id',
    },
    image: {
      file: { url: 'url' },
    },
  };
  const mockedQueryDatabase = jest.fn(async () => ({
    ok: mockedOk,
    data: mockedData,
  }));
  const mockedRetrieveBlockChildren = jest.fn(async () => ({
    ok: mockedOk,
    data: mockedChildrenData,
  }));
  const expectedQueryDatabaseArgs = [
    mockedDataBaseID,
    {
      filter: {
        and: [
          { property: 'Info Ready', checkbox: { equals: true } },
          { property: 'Ready to publish', checkbox: { equals: false } },
        ],
      },
    },
  ];

  beforeAll(() => {
    (deserializeSpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when response is ok', () => {
    beforeEach(() => {
      mockedOk = true;
      (NotionService as unknown as jest.Mock).mockImplementationOnce(() => ({
        queryDatabase: mockedQueryDatabase,
        retrieveBlockChildren: mockedRetrieveBlockChildren,
      }));
    });

    describe('and has results', () => {
      test('returns data', async () => {
        // Arrange
        mockedData = { results: [mockedDataToDeserialize] };
        mockedChildrenData = { results: [mockedChildrenDataToDeserialize] };
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = { data: mockedDeserializedData };
        // Act
        const result = await getSpottedPlanes(
          mockedNotionService,
          mockedDataBaseID
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeSpottedPlanes).toHaveBeenCalledWith(
          [mockedDataToDeserialize],
          { page_id: 'url' }
        );
        expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
          expectedQueryDatabaseArgs[0],
          expectedQueryDatabaseArgs[1]
        );
      });
    });

    describe('and results are empty', () => {
      test('returns empty data', async () => {
        // Arrange
        mockedData = { results: [] };
        mockedChildrenData = { results: [] };
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = { data: mockedDeserializedData };
        // Act
        const result = await getSpottedPlanes(
          mockedNotionService,
          mockedDataBaseID
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeSpottedPlanes).toHaveBeenCalledWith([], {});
        expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
          expectedQueryDatabaseArgs[0],
          expectedQueryDatabaseArgs[1]
        );
      });
    });
  });
  describe('when response is not ok', () => {
    beforeEach(() => {
      mockedOk = false;
      (NotionService as unknown as jest.Mock).mockImplementationOnce(() => ({
        queryDatabase: mockedQueryDatabase,
      }));
    });

    test('returns error', async () => {
      // Arrange
      mockedData = {
        code: 'internal_server_error',
        message: `Internal Server Error`,
        object: 'error',
        status: 500,
      };
      const mockedNotionService = new NotionService(mockedToken);
      const expectedResult = { error: mockedData };
      // Act
      const result = await getSpottedPlanes(
        mockedNotionService,
        mockedDataBaseID
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(deserializeSpottedPlanes).not.toHaveBeenCalled();
      expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
        expectedQueryDatabaseArgs[0],
        expectedQueryDatabaseArgs[1]
      );
    });
  });
});
