import NotionService from '@/common/services/notion';

import { deserializeFlights, serializeFlight } from '@/myFlights/serializers';
import createMyFlight from '../createMyFlight';

jest.mock('@/myFlights/serializers');
jest.mock('@/common/services/notion');

describe('createMyFlight', () => {
  const mockedDeserializedData = ['deserialized data'];
  const mockedSerializedData = 'serialized data';
  const mockedDataBaseID = 'data base id';
  const mockedRequestBody = JSON.stringify({ data: 'request-body' });

  let mockedOk = true;
  let mockedData: any = 'data';
  const mockedCreatePage = jest.fn(() => ({ ok: mockedOk, data: mockedData }));

  beforeEach(() => {
    (serializeFlight as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedSerializedData)
    );
    (deserializeFlights as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates flight and returns it', async () => {
    // Arange
    mockedOk = true;
    mockedData = 'data';
    const mockedNotionService = {
      createPage: mockedCreatePage,
    } as unknown as NotionService;
    const expectedResult = {
      status: 200,
      responseBody: { data: mockedDeserializedData[0] },
    };
    // Act
    const result = await createMyFlight(
      mockedNotionService,
      mockedDataBaseID,
      mockedRequestBody
    );
    // Assert
    expect(result).toEqual(expectedResult);
    expect(serializeFlight).toHaveBeenCalledWith('request-body');
    expect(mockedCreatePage).toHaveBeenCalledWith(
      mockedDataBaseID,
      mockedSerializedData
    );
    expect(deserializeFlights).toHaveBeenCalledWith([mockedData]);
  });

  describe('if response is not ok', () => {
    test('returns error', async () => {
      // Arange
      mockedOk = false;
      mockedData = { status: 401 };
      const mockedNotionService = {
        createPage: mockedCreatePage,
      } as unknown as NotionService;
      const expectedResult = {
        status: 401,
        responseBody: { error: mockedData },
      };
      // Act
      const result = await createMyFlight(
        mockedNotionService,
        mockedDataBaseID,
        mockedRequestBody
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializeFlight).toHaveBeenCalledWith('request-body');
      expect(mockedCreatePage).toHaveBeenCalledWith(
        mockedDataBaseID,
        mockedSerializedData
      );
      expect(deserializeFlights).not.toBeCalled();
    });
  });
});
