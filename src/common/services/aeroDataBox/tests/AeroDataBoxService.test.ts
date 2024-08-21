import fetchMock from 'fetch-mock';
import AeroDataBoxService from '../AeroDataBoxService';

describe('AeroDataBoxService', () => {
  const mockedApiKey = 'api-key';
  const mockedURL = 'https://api.example.com/v1';
  process.env.AERO_DATA_BOX_BASE_URL = mockedURL;

  describe('AeroDataBoxService', () => {
    const mockedSearchBy = 'reg';
    const mockedSearchQuery = 'search-query';

    test('retrieveAircrafts', async () => {
      // Arange
      const responseData = { hello: 'world' };
      const expectedResult = { data: responseData };
      fetchMock.get(
        `${mockedURL}/aircrafts/${mockedSearchBy}/${mockedSearchQuery}/all`,
        responseData
      );
      const aeroDataBoxService = new AeroDataBoxService(mockedApiKey);
      // Act
      const result = await aeroDataBoxService.retrieveAircrafts(
        mockedSearchQuery
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/aircrafts/${mockedSearchBy}/${mockedSearchQuery}/all`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': mockedApiKey,
        },
        method: 'GET',
      });
    });
  });
});
