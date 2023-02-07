import getDay from '@/handlers/fiveBook/get';
import { deserializeDay } from '@/serializers/fiveBook';
import NotionService from '@/services/notion';

jest.mock('@/serializers/fiveBook');
jest.mock('@/services/notion');

describe('getDay', () => {
  let mockedResponse: object;
  let mockedData: object;

  const mockedDataBaseID = 'mocked_data_base_id';
  const mockedDayCode = '10101';
  const mockedToken = 'mocked_token';
  const mockedDeserializedData = { data: 'some deserialized data' };
  const mockedDataToDeserialize = { data: 'some data to deserialize' };
  const expectedQueryDatabaseArgs = [
    mockedDataBaseID,
    {
      filter: {
        and: [{ property: 'Day code', number: { equals: +mockedDayCode } }],
      },
    },
  ];
  const mockedQueryDatabase = jest.fn(async () => ({
    response: mockedResponse,
    data: mockedData,
  }));

  beforeAll(() => {
    (deserializeDay as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when response is ok', () => {
    beforeEach(() => {
      mockedResponse = { ok: true };
      (NotionService as unknown as jest.Mock).mockImplementationOnce(() => ({
        queryDatabase: mockedQueryDatabase,
      }));
    });

    describe('and has result', () => {
      test('returns data', async () => {
        // Arrange
        mockedData = { results: [mockedDataToDeserialize] };
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = { data: mockedDeserializedData };
        // Act
        const result = await getDay(
          mockedNotionService,
          mockedDataBaseID,
          mockedDayCode
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeDay).toHaveBeenCalledWith(mockedDataToDeserialize);
        expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
          expectedQueryDatabaseArgs[0],
          expectedQueryDatabaseArgs[1]
        );
      });
    });

    describe('and has no result', () => {
      test('returns 404 error', async () => {
        // Arrange
        mockedData = { results: [] };
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = { error: { status: 404 } };
        // Act
        const result = await getDay(
          mockedNotionService,
          mockedDataBaseID,
          mockedDayCode
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeDay).not.toHaveBeenCalled();
        expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
          expectedQueryDatabaseArgs[0],
          expectedQueryDatabaseArgs[1]
        );
      });
    });
  });

  describe('when response is not ok', () => {
    beforeEach(() => {
      mockedResponse = { ok: false };
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
      const result = await getDay(
        mockedNotionService,
        mockedDataBaseID,
        mockedDayCode
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(deserializeDay).not.toHaveBeenCalled();
      expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
        expectedQueryDatabaseArgs[0],
        expectedQueryDatabaseArgs[1]
      );
    });
  });
});
