import NotionService from '@/common/services/notion';

import {
  deserializeMyFlights,
  serializeMyFlight,
} from '@/myFlights/serializers';
import updateMyFlight from '../updateMyFlight';

jest.mock('@/myFlights/serializers');
jest.mock('@/common/services/notion');

describe('updateMyFlight', () => {
  const mockedDeserializedData = ['deserialized data'];
  const mockedSerializedData = 'serialized data';
  const mockedID = 'id';
  const mockedRequestBody = JSON.stringify({ data: 'request-body' });

  let mockedOk = true;
  let mockedData: any = 'data';
  const mockedUpdatePage = jest.fn(() => ({ ok: mockedOk, data: mockedData }));

  beforeEach(() => {
    (serializeMyFlight as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedSerializedData)
    );
    (deserializeMyFlights as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('updates flight and returns it', async () => {
    // Arange
    mockedOk = true;
    mockedData = 'data';
    const mockedNotionService = {
      updatePage: mockedUpdatePage,
    } as unknown as NotionService;
    const expectedResult = {
      status: 200,
      responseBody: { data: mockedDeserializedData[0] },
    };
    // Act
    const result = await updateMyFlight(
      mockedNotionService,
      mockedID,
      mockedRequestBody
    );
    // Assert
    expect(result).toEqual(expectedResult);
    expect(serializeMyFlight).toHaveBeenCalledWith('request-body');
    expect(mockedUpdatePage).toHaveBeenCalledWith(
      mockedID,
      mockedSerializedData
    );
    expect(deserializeMyFlights).toHaveBeenCalledWith([mockedData]);
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
      const result = await updateMyFlight(
        mockedNotionService,
        mockedID,
        mockedRequestBody
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializeMyFlight).toHaveBeenCalledWith('request-body');
      expect(mockedUpdatePage).toHaveBeenCalledWith(
        mockedID,
        mockedSerializedData
      );
      expect(deserializeMyFlights).not.toBeCalled();
    });
  });
});
