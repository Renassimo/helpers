import updateDay from '@/handlers/fiveBook/update';
import NotionService from '@/services/notion';
import { deserializeDay, serializeDay } from '@/serializers/fiveBook';

jest.mock('@/serializers/fiveBook');
jest.mock('@/services/notion');

describe('updateDay', () => {
  let mockedResponse: object;
  let mockedData: object;

  const mockedID = 'mocked_id';
  const mockedToken = 'mocked_token';
  const mockedBody = {
    data: 'some data to serialize',
    id: mockedID,
  };
  const mockedRequestBody = JSON.stringify(mockedBody);
  const mockedSerializedData = { data: 'some serialize data' };
  const mockedDataToDeserialize = { data: 'some data to deserialize' };
  const mockedDeserializedData = 'some deserialized data';
  const mockedErrorMessage = 'Not Authenticated';
  const expectedUpdatePageArgs = [
    mockedID,
    {
      properties: mockedSerializedData,
    },
  ];
  const mockedUpdatePage = jest.fn(async () => ({
    response: mockedResponse,
    data: mockedData,
  }));

  beforeAll(() => {
    (serializeDay as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedSerializedData)
    );
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
        updatePage: mockedUpdatePage,
      }));
    });

    test('returns data', async () => {
      // Arrange
      mockedData = mockedDataToDeserialize;
      const mockedNotionService = new NotionService(mockedToken);
      const expectedResult = {
        status: 200,
        responseBody: { data: mockedDeserializedData },
      };
      // Act
      const result = await updateDay(mockedNotionService, mockedRequestBody);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializeDay).toHaveBeenCalledWith(mockedBody);
      expect(deserializeDay).toHaveBeenCalledWith(mockedDataToDeserialize);
      expect(mockedNotionService.updatePage).toHaveBeenCalledWith(
        expectedUpdatePageArgs[0],
        expectedUpdatePageArgs[1]
      );
    });
  });
  describe('when response is not ok', () => {
    beforeEach(() => {
      mockedResponse = { ok: false };
      (NotionService as unknown as jest.Mock).mockImplementationOnce(() => ({
        updatePage: mockedUpdatePage,
      }));
    });

    test('returns error', async () => {
      // Arrange
      mockedData = { status: 401, message: mockedErrorMessage };
      const mockedNotionService = new NotionService(mockedToken);
      const expectedResult = {
        status: 401,
        responseBody: { error: mockedData },
      };
      // Act
      const result = await updateDay(mockedNotionService, mockedRequestBody);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializeDay).toHaveBeenCalledWith(mockedBody);
      expect(deserializeDay).not.toHaveBeenCalled();
      expect(mockedNotionService.updatePage).toHaveBeenCalledWith(
        expectedUpdatePageArgs[0],
        expectedUpdatePageArgs[1]
      );
    });
  });
});
