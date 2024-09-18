import NotionService from '@/common/services/notion';

import {
  deserializeMyFlights,
  serializeMyFlight,
} from '@/myFlights/serializers';

import getMyLastFlight from '@/myFlights/handlers/myFlights/getMyLastFlight';

import createMyFlight from '../createMyFlight';

jest.mock('@/myFlights/serializers');
jest.mock('@/common/services/notion');
jest.mock('@/myFlights/handlers/myFlights/getMyLastFlight');

describe('createMyFlight', () => {
  const mockedDeserializedData = ['deserialized data'];
  const mockedSerializedData = 'serialized data';
  const mockedDataBaseID = 'data base id';
  const mockedRequestBody = JSON.stringify({
    data: { attributes: { someAttr: 'request-body' } },
  });

  let mockedOk = true;
  let mockedData: any = 'data';
  const mockedCreatePage = jest.fn(() => ({ ok: mockedOk, data: mockedData }));

  beforeEach(() => {
    (serializeMyFlight as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedSerializedData)
    );
    (deserializeMyFlights as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
    (getMyLastFlight as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ attributes: { number: 100 } }))
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
    expect(getMyLastFlight).toBeCalledWith(
      mockedNotionService,
      mockedDataBaseID
    );
    expect(serializeMyFlight).toHaveBeenCalledWith({
      attributes: { number: 101, someAttr: 'request-body' },
    });
    expect(mockedCreatePage).toHaveBeenCalledWith(
      mockedDataBaseID,
      mockedSerializedData
    );
    expect(deserializeMyFlights).toHaveBeenCalledWith([mockedData]);
  });

  describe('when number passed in body', () => {
    test('creates flight and returns it', async () => {
      // Arange
      const mockedRequestBody = JSON.stringify({
        data: { attributes: { someAttr: 'request-body', number: 50 } },
      });
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
      expect(serializeMyFlight).toHaveBeenCalledWith({
        attributes: { number: 50, someAttr: 'request-body' },
      });
      expect(getMyLastFlight).not.toBeCalled();
      expect(mockedCreatePage).toHaveBeenCalledWith(
        mockedDataBaseID,
        mockedSerializedData
      );
      expect(deserializeMyFlights).toHaveBeenCalledWith([mockedData]);
    });
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
      expect(serializeMyFlight).toHaveBeenCalledWith({
        attributes: { number: 101, someAttr: 'request-body' },
      });
      expect(getMyLastFlight).toBeCalledWith(
        mockedNotionService,
        mockedDataBaseID
      );
      expect(mockedCreatePage).toHaveBeenCalledWith(
        mockedDataBaseID,
        mockedSerializedData
      );
      expect(deserializeMyFlights).not.toBeCalled();
    });
  });
});
