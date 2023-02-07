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
  const mockedQueryDatabase = jest.fn(async () => ({
    response: mockedResponse,
    data: mockedData,
  }));

  beforeAll(() => {
    (deserializeDay as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  describe('when response is ok', () => {
    beforeEach(() => {
      mockedResponse = { ok: true };
      (NotionService as unknown as jest.Mock).mockImplementationOnce(() => ({
        queryDatabase: mockedQueryDatabase,
      }));
    });

    describe('and has result', () => {
      test('responses with data', async () => {
        // Arrange
        mockedData = { results: [{ data: 'some data to deserialize' }] };
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
      });
    });

    describe('and has no result', () => {
      test('responses with 404 error', async () => {
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

    test('responses with error', async () => {
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
    });
  });
});
