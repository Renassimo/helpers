import AeroDataBoxService from '../AeroDataBoxService';

describe('AeroDataBoxService', () => {
  const mockedApiKey = 'api-key';
  const mockedURL = 'https://api.example.com/v1';
  process.env.AERO_DATA_BOX_BASE_URL = mockedURL;

  const responseGetData = { hello: 'world' };
  const expectedResult = responseGetData;

  const aeroDataBoxService = new AeroDataBoxService(mockedApiKey);

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('retrieveAircrafts', () => {
    const mockedSearchBy = 'reg';
    const mockedSearchQuery = 'search-query';

    test('returns data', async () => {
      // Arrange
      const mockResponse = {
        json: async () => responseGetData,
        status: 200,
        headers: { get: () => 'application/json' },
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await aeroDataBoxService.retrieveAircrafts(
        mockedSearchQuery
      );

      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/aircrafts/${mockedSearchBy}/${mockedSearchQuery}/all?withImage=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': mockedApiKey,
          },
          method: 'GET',
        }
      );
    });

    describe('when fetch returns 204 status', () => {
      test('returns data', async () => {
        // Arrange
        const mockResponse = {
          json: async () => null,
          status: 204,
          headers: { get: () => 'application/json' },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Act
        const result = await aeroDataBoxService.retrieveAircrafts(
          mockedSearchQuery
        );

        // Assert
        expect(result).toEqual([]);
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedURL}/aircrafts/${mockedSearchBy}/${mockedSearchQuery}/all?withImage=true`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': mockedApiKey,
            },
            method: 'GET',
          }
        );
      });
    });
  });

  describe('retreiveAirportByCode', () => {
    const mockedSearchBy = 'iata';
    const mockedCode = 'waw';

    test('returns data', async () => {
      // Arrange
      const mockResponse = {
        json: async () => responseGetData,
        status: 200,
        headers: { get: () => 'application/json' },
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await aeroDataBoxService.retreiveAirportByCode(mockedCode);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/airports/${mockedSearchBy}/${mockedCode}?withTime=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': mockedApiKey,
          },
          method: 'GET',
        }
      );
    });

    describe('when receives 204 status', () => {
      test('returns data', async () => {
        // Arrange
        const mockResponse = {
          json: async () => null,
          status: 204,
          headers: { get: () => 'application/json' },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Act
        const result = await aeroDataBoxService.retreiveAirportByCode(
          mockedCode
        );

        // Assert
        expect(result).toEqual(null);
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedURL}/airports/${mockedSearchBy}/${mockedCode}?withTime=true`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': mockedApiKey,
            },
            method: 'GET',
          }
        );
      });
    });
  });
  describe('retreiveAirportsByText', () => {
    const mockedSearchQuery = 'search-query';

    test('returns data', async () => {
      // Arrange
      const mockResponse = {
        json: async () => ({ items: [responseGetData] }),
        status: 200,
        headers: { get: () => 'application/json' },
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await aeroDataBoxService.retreiveAirportsByText(
        mockedSearchQuery
      );

      // Assert
      expect(result).toEqual([responseGetData]);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/airports/search/term?q=${mockedSearchQuery}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': mockedApiKey,
          },
          method: 'GET',
        }
      );
    });

    describe('when receives 204 status', () => {
      test('returns data', async () => {
        // Arrange
        const mockResponse = {
          json: async () => null,
          status: 204,
          headers: { get: () => 'application/json' },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Act
        const result = await aeroDataBoxService.retreiveAirportsByText(
          mockedSearchQuery
        );

        // Assert
        expect(result).toEqual([]);
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedURL}/airports/search/term?q=${mockedSearchQuery}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': mockedApiKey,
            },
            method: 'GET',
          }
        );
      });
    });
  });

  describe('retreiveAirportsByLocation', () => {
    const mockedLat = 'lattitude';
    const mockedLon = 'longitude';

    test('returns data', async () => {
      // Arrange
      const mockResponse = {
        json: async () => ({ items: [responseGetData] }),
        status: 200,
        headers: { get: () => 'application/json' },
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await aeroDataBoxService.retreiveAirportsByLocation(
        mockedLat,
        mockedLon
      );

      // Assert
      expect(result).toEqual([responseGetData]);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/airports/search/location?lat=${mockedLat}&lon=${mockedLon}&radiusKm=25&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': mockedApiKey,
          },
          method: 'GET',
        }
      );
    });

    describe('when receives 204 status', () => {
      test('returns data', async () => {
        // Arrange
        const mockResponse = {
          json: async () => null,
          status: 204,
          headers: { get: () => 'application/json' },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Act
        const result = await aeroDataBoxService.retreiveAirportsByLocation(
          mockedLat,
          mockedLon
        );

        // Assert
        expect(result).toEqual([]);
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedURL}/airports/search/location?lat=${mockedLat}&lon=${mockedLon}&radiusKm=25&limit=10`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': mockedApiKey,
            },
            method: 'GET',
          }
        );
      });
    });
  });

  describe('retreiveFlights', () => {
    const mockedFlightNumber = 'flight-number';
    const mockedDate = 'date';

    test('returns data', async () => {
      // Arrange
      const mockResponse = {
        json: async () => [responseGetData],
        status: 200,
        headers: { get: () => 'application/json' },
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await aeroDataBoxService.retreiveFlights(
        mockedFlightNumber
      );

      // Assert
      expect(result).toEqual([responseGetData]);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockedURL}/flights/number/${mockedFlightNumber}?withAircraftImage=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': mockedApiKey,
          },
          method: 'GET',
        }
      );
    });

    describe('when fetch returns 204 status', () => {
      test('returns data', async () => {
        // Arrange
        const mockResponse = {
          json: async () => null,
          status: 204,
          headers: { get: () => 'application/json' },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Act
        const result = await aeroDataBoxService.retreiveFlights(
          mockedFlightNumber
        );

        // Assert
        expect(result).toEqual([]);
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedURL}/flights/number/${mockedFlightNumber}?withAircraftImage=true`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': mockedApiKey,
            },
            method: 'GET',
          }
        );
      });
    });

    describe('when date passed', () => {
      test('returns data', async () => {
        // Arrange
        const mockResponse = {
          json: async () => [responseGetData],
          status: 200,
          headers: { get: () => 'application/json' },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        // Act
        const result = await aeroDataBoxService.retreiveFlights(
          mockedFlightNumber,
          mockedDate
        );

        // Assert
        expect(result).toEqual([responseGetData]);
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedURL}/flights/number/${mockedFlightNumber}/${mockedDate}?withAircraftImage=true`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': mockedApiKey,
            },
            method: 'GET',
          }
        );
      });
    });
  });
});
