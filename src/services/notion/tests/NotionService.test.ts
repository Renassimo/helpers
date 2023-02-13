import NotionService from '@/services/notion';
import fetchMock from 'fetch-mock';

describe('Notion service', () => {
  const mockedToken = 'token';
  const mockedArgs = {
    arg1: [],
    arg2: {},
  };
  const mockedURL = 'https://api.example.com/v1';
  process.env.NOTION_API_BASE_URL = mockedURL;

  describe('queryDatabase', () => {
    const mockedDataBaseID = 'data-base-id';

    test('returns data', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      fetchMock.post(
        `${mockedURL}/databases/${mockedDataBaseID}/query`,
        responseData
      );
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.queryDatabase(
        mockedDataBaseID,
        mockedArgs
      );
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('updatePage', () => {
    const mockedPageID = 'page-id';

    test('Test', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      fetchMock.patch(`${mockedURL}/pages/${mockedPageID}`, responseData);
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.updatePage(mockedPageID, mockedArgs);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('retrieveBlockChildren', () => {
    const mockedBlockID = 'block-id';

    test('Test', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      fetchMock.get(
        `${mockedURL}/blocks/${mockedBlockID}/children`,
        responseData
      );
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.retrieveBlockChildren(mockedBlockID);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
