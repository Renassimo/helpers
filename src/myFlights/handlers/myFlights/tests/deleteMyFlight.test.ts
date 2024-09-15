import NotionService from '@/common/services/notion';

import deleteMyFlight from '../deleteMyFlight';

jest.mock('@/common/services/notion');

describe('deleteMyFlight', () => {
  const mockedID = 'id';

  let mockedOk = true;
  let mockedData: any = 'data';
  const mockedUpdatePage = jest.fn(() => ({ ok: mockedOk, data: mockedData }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deletes flight', async () => {
    // Arange
    mockedOk = true;
    mockedData = 'data';
    const mockedNotionService = {
      updatePage: mockedUpdatePage,
    } as unknown as NotionService;
    const expectedResult = {
      status: 204,
      responseBody: {},
    };
    // Act
    const result = await deleteMyFlight(mockedNotionService, mockedID);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockedUpdatePage).toHaveBeenCalledWith(mockedID, { archived: true });
  });

  describe('if response is not ok', () => {
    test('returns error', async () => {
      // Arange
      mockedOk = false;
      mockedData = { status: 401 };
      const mockedNotionService = {
        updatePage: mockedUpdatePage,
      } as unknown as NotionService;
      const expectedResult = {
        status: 401,
        responseBody: { error: mockedData },
      };
      // Act
      const result = await deleteMyFlight(mockedNotionService, mockedID);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedUpdatePage).toHaveBeenCalledWith(mockedID, {
        archived: true,
      });
    });
  });
});
