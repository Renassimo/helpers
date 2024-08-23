import NotionService from '@/common/services/notion';

import getFlights from '@/myFlights/handlers/getFlights';

import { deserializeFlights } from '@/myFlights/serializers';

jest.mock('@/myFlights/serializers');
jest.mock('@/common/services/notion');

describe('getFlights', () => {
  let mockedOk: boolean;
  let mockedData: object;

  const mockedDataBaseID = 'mocked_data_base_id';
  const mockedToken = 'mocked_token';
  const mockedDeserializedData = { data: 'some deserialized data' };
  const mockedDataToDeserialize = { data: 'some data to deserialize' };
  const mockedQueryDatabase = jest.fn(async () => ({
    ok: mockedOk,
    data: mockedData,
  }));
  const expectedQueryDatabaseArgs = [
    mockedDataBaseID,
    {
      sorts: [{ property: 'Date', direction: 'ascending' }],
    },
  ];

  beforeAll(() => {
    (deserializeFlights as unknown as jest.Mock).mockImplementation(
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
      }));
    });

    describe('and has results', () => {
      test('returns data', async () => {
        // Arrange
        mockedData = { results: [mockedDataToDeserialize] };
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = { data: mockedDeserializedData };
        // Act
        const result = await getFlights(mockedNotionService, mockedDataBaseID);
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeFlights).toHaveBeenCalledWith([
          mockedDataToDeserialize,
        ]);
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
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = { data: mockedDeserializedData };
        // Act
        const result = await getFlights(mockedNotionService, mockedDataBaseID);
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeFlights).toHaveBeenCalledWith([]);
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
      const result = await getFlights(mockedNotionService, mockedDataBaseID);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(deserializeFlights).not.toHaveBeenCalled();
      expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
        expectedQueryDatabaseArgs[0],
        expectedQueryDatabaseArgs[1]
      );
    });
  });
});
