import fetchMock from 'fetch-mock';
import AeroDataBoxService from '../AeroDataBoxService';

describe('AeroDataBoxService', () => {
  const mockedApiKey = 'api-key';
  const mockedURL = 'https://api.example.com/v1';
  process.env.AERO_DATA_BOX_BASE_URL = mockedURL;

  const responseGetData = { hello: 'world' };
  const expectedResult = responseGetData;

  const aeroDataBoxService = new AeroDataBoxService(mockedApiKey);

  afterEach(() => {
    fetchMock.reset();
  });

  describe('retrieveAircrafts', () => {
    const mockedSearchBy = 'reg';
    const mockedSearchQuery = 'search-query';

    test('returns data', async () => {
      // Arange
      fetchMock.get(
        `${mockedURL}/aircrafts/${mockedSearchBy}/${mockedSearchQuery}/all`,
        responseGetData
      );
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

    describe('when fetch returns 204 status', () => {
      test('returns data', async () => {
        // Arange
        fetchMock.get(
          `${mockedURL}/aircrafts/${mockedSearchBy}/${mockedSearchQuery}/all`,
          { status: 204 }
        );
        // Act
        const result = await aeroDataBoxService.retrieveAircrafts(
          mockedSearchQuery
        );
        // Assert
        expect(result).toEqual([]);
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

  describe('retreiveAirportByCode', () => {
    const mockedSearchBy = 'iata';
    const mockedCode = 'waw';

    test('returns data', async () => {
      // Arange
      fetchMock.get(
        `${mockedURL}/airports/${mockedSearchBy}/${mockedCode}?withTime=true`,
        responseGetData
      );
      // Act
      const result = await aeroDataBoxService.retreiveAirportByCode(mockedCode);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/airports/${mockedSearchBy}/${mockedCode}?withTime=true`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': mockedApiKey,
        },
        method: 'GET',
      });
    });

    describe('when receives 204 status', () => {
      test('returns data', async () => {
        // Arange
        fetchMock.get(
          `${mockedURL}/airports/${mockedSearchBy}/${mockedCode}?withTime=true`,
          { status: 204 }
        );
        // Act
        const result = await aeroDataBoxService.retreiveAirportByCode(
          mockedCode
        );
        // Assert
        expect(result).toEqual(null);
        expect(fetchMock.lastUrl()).toEqual(
          `${mockedURL}/airports/${mockedSearchBy}/${mockedCode}?withTime=true`
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

  describe('retreiveAirportsByText', () => {
    const mockedSearchQuery = 'search-query';

    test('returns data', async () => {
      // Arange
      const expectedResult = [responseGetData];
      const responseData = {
        items: [responseGetData],
      };
      fetchMock.get(
        `${mockedURL}/airports/search/term?q=${mockedSearchQuery}`,
        responseData
      );
      // Act
      const result = await aeroDataBoxService.retreiveAirportsByText(
        mockedSearchQuery
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/airports/search/term?q=${mockedSearchQuery}`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': mockedApiKey,
        },
        method: 'GET',
      });
    });

    describe('when receives 204 status', () => {
      test('returns data', async () => {
        // Arange
        fetchMock.get(
          `${mockedURL}/airports/search/term?q=${mockedSearchQuery}`,
          { status: 204 }
        );
        // Act
        const result = await aeroDataBoxService.retreiveAirportsByText(
          mockedSearchQuery
        );
        // Assert
        expect(result).toEqual([]);
        expect(fetchMock.lastUrl()).toEqual(
          `${mockedURL}/airports/search/term?q=${mockedSearchQuery}`
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

  describe('retreiveAirportsByLocation', () => {
    const mockedLat = 'lattitude';
    const mockedLon = 'longitude';

    test('returns data', async () => {
      // Arange
      const expectedResult = [responseGetData];
      const responseData = {
        items: [responseGetData],
      };
      fetchMock.get(
        `${mockedURL}/airports/search/location?lat=${mockedLat}&lon=${mockedLon}&radiusKm=25&limit=10`,
        responseData
      );
      // Act
      const result = await aeroDataBoxService.retreiveAirportsByLocation(
        mockedLat,
        mockedLon
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/airports/search/location?lat=${mockedLat}&lon=${mockedLon}&radiusKm=25&limit=10`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': mockedApiKey,
        },
        method: 'GET',
      });
    });

    describe('when receives 204 status', () => {
      test('returns data', async () => {
        // Arange
        fetchMock.get(
          `${mockedURL}/airports/search/location?lat=${mockedLat}&lon=${mockedLon}&radiusKm=25&limit=10`,
          { status: 204 }
        );
        // Act
        const result = await aeroDataBoxService.retreiveAirportsByLocation(
          mockedLat,
          mockedLon
        );
        // Assert
        expect(result).toEqual([]);
        expect(fetchMock.lastUrl()).toEqual(
          `${mockedURL}/airports/search/location?lat=${mockedLat}&lon=${mockedLon}&radiusKm=25&limit=10`
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

  describe('retreiveFlights', () => {
    const mockedFlightNumber = 'flight-number';
    const mockedDate = 'date';

    test('returns data', async () => {
      // Arange
      const expectedResult = [responseGetData];
      const responseData = [responseGetData];
      fetchMock.get(
        `${mockedURL}/flights/number/${mockedFlightNumber}?withAircraftImage=true`,
        responseData
      );
      // Act
      const result = await aeroDataBoxService.retreiveFlights(
        mockedFlightNumber
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(fetchMock.lastUrl()).toEqual(
        `${mockedURL}/flights/number/${mockedFlightNumber}?withAircraftImage=true`
      );
      expect(fetchMock.lastOptions()).toEqual({
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': mockedApiKey,
        },
        method: 'GET',
      });
    });

    describe('when fetch returns 204 status', () => {
      test('returns data', async () => {
        // Arange
        fetchMock.get(
          `${mockedURL}/flights/number/${mockedFlightNumber}?withAircraftImage=true`,
          { status: 204 }
        );
        // Act
        const result = await aeroDataBoxService.retreiveFlights(
          mockedFlightNumber
        );
        // Assert
        expect(result).toEqual([]);
        expect(fetchMock.lastUrl()).toEqual(
          `${mockedURL}/flights/number/${mockedFlightNumber}?withAircraftImage=true`
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

    describe('when date passed', () => {
      test('returns data', async () => {
        // Arange
        const expectedResult = [responseGetData];
        const responseData = [responseGetData];
        fetchMock.get(
          `${mockedURL}/flights/number/${mockedFlightNumber}/${mockedDate}?withAircraftImage=true`,
          responseData
        );
        // Act
        const result = await aeroDataBoxService.retreiveFlights(
          mockedFlightNumber,
          mockedDate
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(fetchMock.lastUrl()).toEqual(
          `${mockedURL}/flights/number/${mockedFlightNumber}/${mockedDate}?withAircraftImage=true`
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
});
