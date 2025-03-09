import NotionService from '@/common/services/notion';

describe('Notion service', () => {
  const mockedToken = 'token';
  const mockedArgs = {
    arg1: [],
    arg2: {},
  };
  const mockedURL = 'https://api.example.com/v1';
  process.env.NOTION_API_BASE_URL = mockedURL;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('queryDatabase', () => {
    const mockedDataBaseID = 'data-base-id';

    test('returns data', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(responseData),
          ok: true,
        })
      ) as jest.Mock;
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.queryDatabase(
        mockedDataBaseID,
        mockedArgs
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/databases/${mockedDataBaseID}/query`,
        {
          body: '{"arg1":[],"arg2":{}}',
          headers: {
            Authorization: 'Bearer token',
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22',
          },
          method: 'POST',
        }
      );
    });
  });

  describe('retreiveDatabase', () => {
    const mockedDataBaseID = 'data-base-id';

    test('returns data', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(responseData),
          ok: true,
        })
      ) as jest.Mock;
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.retreiveDatabase(mockedDataBaseID);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/databases/${mockedDataBaseID}`,
        {
          headers: {
            Authorization: 'Bearer token',
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22',
          },
          method: 'GET',
        }
      );
    });
  });

  describe('updatePage', () => {
    const mockedPageID = 'page-id';

    test('updates page', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(responseData),
          ok: true,
        })
      ) as jest.Mock;
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.updatePage(mockedPageID, mockedArgs);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/pages/${mockedPageID}`,
        {
          body: '{"arg1":[],"arg2":{}}',
          headers: {
            Authorization: 'Bearer token',
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22',
          },
          method: 'PATCH',
        }
      );
    });
  });

  describe('createPage', () => {
    const mockedDataBaseID = 'data-base-id';

    test('creates page', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(responseData),
          ok: true,
        })
      ) as jest.Mock;
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.createPage(
        mockedDataBaseID,
        mockedArgs
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(`${mockedURL}/pages`, {
        body: '{"parent":{"database_id":"data-base-id"},"arg1":[],"arg2":{}}',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
          'Notion-Version': '2022-02-22',
        },
        method: 'POST',
      });
    });
  });

  describe('retrieveBlockChildren', () => {
    const mockedBlockID = 'block-id';

    test('returns data', async () => {
      // Arrange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData, ok: true };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(responseData),
          ok: true,
        })
      ) as jest.Mock;
      const notionService = new NotionService(mockedToken);
      // Act
      const result = await notionService.retrieveBlockChildren(mockedBlockID);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/blocks/${mockedBlockID}/children`,
        {
          headers: {
            Authorization: 'Bearer token',
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22',
          },
          method: 'GET',
        }
      );
    });
  });
});
