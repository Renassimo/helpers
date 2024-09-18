import NotionService from '@/common/services/notion';

import getMyFlights from '@/myFlights/handlers/myFlights/getMyFlights';

import { deserializeMyFlights } from '@/myFlights/serializers';

jest.mock('@/myFlights/serializers');
jest.mock('@/common/services/notion');

describe('getMyFlights', () => {
  let mockedOk: boolean;
  let mockedData: object;

  const mockedDataBaseID = 'mocked_data_base_id';
  const mockedDeserializedData = { data: 'some deserialized data' };
  const mockedDataToDeserialize = { data: 'some data to deserialize' };
  const mockedQueryDatabase = jest.fn(async () => ({
    ok: mockedOk,
    data: mockedData,
  }));
  const expectedQueryDatabaseArgs = [
    mockedDataBaseID,
    {
      sorts: [
        { property: 'Date', direction: 'descending' },
        { property: 'N', direction: 'descending' },
        { timestamp: 'created_time', direction: 'descending' },
      ],
    },
  ];

  beforeAll(() => {
    (deserializeMyFlights as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when response is ok', () => {
    describe('and has results', () => {
      test('returns data', async () => {
        // Arrange
        mockedData = { results: [mockedDataToDeserialize] };
        mockedOk = true;
        const mockedNotionService = {
          queryDatabase: mockedQueryDatabase,
        } as unknown as NotionService;
        const expectedResult = {
          data: mockedDeserializedData,
          nextCursor: null,
        };
        // Act
        const result = await getMyFlights(
          mockedNotionService,
          mockedDataBaseID
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeMyFlights).toHaveBeenCalledWith([
          mockedDataToDeserialize,
        ]);
        expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
          expectedQueryDatabaseArgs[0],
          expectedQueryDatabaseArgs[1]
        );
      });

      describe('and when cursor passed has results', () => {
        test('returns data', async () => {
          // Arrange
          const cursor = 'cursor';
          const nextCursor = 'nextCursor';
          mockedData = {
            results: [mockedDataToDeserialize],
            has_more: true,
            next_cursor: 'nextCursor',
          };
          mockedOk = true;
          const mockedNotionService = {
            queryDatabase: mockedQueryDatabase,
          } as unknown as NotionService;
          const expectedResult = {
            data: mockedDeserializedData,
            nextCursor,
          };
          // Act
          const result = await getMyFlights(
            mockedNotionService,
            mockedDataBaseID,
            cursor
          );
          // Assert
          expect(result).toEqual(expectedResult);
          expect(deserializeMyFlights).toHaveBeenCalledWith([
            mockedDataToDeserialize,
          ]);
          expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
            expectedQueryDatabaseArgs[0],
            {
              ...(expectedQueryDatabaseArgs[1] as object),
              start_cursor: cursor,
            }
          );
        });
      });
    });

    describe('and results are empty', () => {
      test('returns empty data', async () => {
        // Arrange
        mockedData = { results: [] };
        const mockedNotionService = {
          queryDatabase: mockedQueryDatabase,
        } as unknown as NotionService;
        const expectedResult = {
          data: mockedDeserializedData,
          nextCursor: null,
        };
        // Act
        const result = await getMyFlights(
          mockedNotionService,
          mockedDataBaseID
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(deserializeMyFlights).toHaveBeenCalledWith([]);
        expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
          expectedQueryDatabaseArgs[0],
          expectedQueryDatabaseArgs[1]
        );
      });
    });
  });

  describe('when response is not ok', () => {
    test('returns error', async () => {
      // Arrange
      mockedData = {
        code: 'internal_server_error',
        message: `Internal Server Error`,
        object: 'error',
        status: 500,
      };
      mockedOk = false;
      const mockedNotionService = {
        queryDatabase: mockedQueryDatabase,
      } as unknown as NotionService;
      const expectedResult = { error: mockedData };
      // Act
      const result = await getMyFlights(mockedNotionService, mockedDataBaseID);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(deserializeMyFlights).not.toHaveBeenCalled();
      expect(mockedNotionService.queryDatabase).toHaveBeenCalledWith(
        expectedQueryDatabaseArgs[0],
        expectedQueryDatabaseArgs[1]
      );
    });
  });
});
