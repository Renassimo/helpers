import NotionService from '@/common/services/notion';
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
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/databases/${mockedDataBaseID}/query`
      );
      expect(fetchMock.lastOptions()).toEqual({
        body: '{"arg1":[],"arg2":{}}',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
          'Notion-Version': '2022-02-22',
        },
        method: 'POST',
      });
    });
  });

  describe('queryDatabase', () => {
    const mockedDataBaseID = 'data-base-id';

    test('returns data', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      fetchMock.get(`${mockedURL}/databases/${mockedDataBaseID}`, responseData);
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.retreiveDatabase(mockedDataBaseID);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/databases/${mockedDataBaseID}`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
          'Notion-Version': '2022-02-22',
        },
        method: 'GET',
      });
    });
  });

  describe('updatePage', () => {
    const mockedPageID = 'page-id';

    test('updates page', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      fetchMock.patch(`${mockedURL}/pages/${mockedPageID}`, responseData);
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.updatePage(mockedPageID, mockedArgs);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(`${mockedURL}/pages/${mockedPageID}`);
      expect(fetchMock.lastOptions()).toEqual({
        body: '{"arg1":[],"arg2":{}}',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
          'Notion-Version': '2022-02-22',
        },
        method: 'PATCH',
      });
    });
  });

  describe('retrieveBlockChildren', () => {
    const mockedBlockID = 'block-id';

    test('returns data', async () => {
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
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/blocks/${mockedBlockID}/children`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
          'Notion-Version': '2022-02-22',
        },
        method: 'GET',
      });
    });
  });
});
