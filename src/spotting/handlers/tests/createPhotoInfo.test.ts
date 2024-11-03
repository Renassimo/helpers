import NotionService from '@/common/services/notion';

import {
  deserializePhotoInfo,
  serializePhotoInfo,
} from '@/spotting/serializers';

import createPhotoInfo from '../createPhotoInfo';

jest.mock('@/spotting/serializers');
jest.mock('@/common/services/notion');

describe('createPhotoInfo', () => {
  const mockedDeserializedData = 'deserialized data';
  const mockedSerializedData = 'serialized data';
  const mockedDataBaseID = 'data base id';
  const mockedRequestBody = JSON.stringify({
    data: { attributes: { someAttr: 'request-body' } },
  });

  let mockedOk = true;
  let mockedData: any = 'data';
  const mockedCreatePage = jest.fn(() => ({ ok: mockedOk, data: mockedData }));

  beforeEach(() => {
    (serializePhotoInfo as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedSerializedData)
    );
    (deserializePhotoInfo as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedDeserializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates PhotoInfo and returns it', async () => {
    // Arange
    mockedOk = true;
    mockedData = 'data';
    const mockedNotionService = {
      createPage: mockedCreatePage,
    } as unknown as NotionService;
    const expectedResult = {
      status: 201,
      responseBody: { data: mockedDeserializedData },
    };
    // Act
    const result = await createPhotoInfo(
      mockedNotionService,
      mockedDataBaseID,
      mockedRequestBody
    );
    // Assert
    expect(result).toEqual(expectedResult);
    expect(serializePhotoInfo).toHaveBeenCalledWith({
      attributes: { someAttr: 'request-body' },
    });
    expect(mockedCreatePage).toHaveBeenCalledWith(
      mockedDataBaseID,
      mockedSerializedData
    );
    expect(deserializePhotoInfo).toHaveBeenCalledWith(mockedData);
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
      const result = await createPhotoInfo(
        mockedNotionService,
        mockedDataBaseID,
        mockedRequestBody
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializePhotoInfo).toHaveBeenCalledWith({
        attributes: { someAttr: 'request-body' },
      });
      expect(mockedCreatePage).toHaveBeenCalledWith(
        mockedDataBaseID,
        mockedSerializedData
      );
      expect(deserializePhotoInfo).not.toBeCalled();
    });
  });
});
