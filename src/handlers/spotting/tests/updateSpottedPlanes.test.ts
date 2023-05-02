import updateSpottedPlanes from '@/handlers/spotting/updateSpottedPlanes';
import NotionService from '@/services/notion';
import { serializeSpottedPlanes } from '@/serializers/spotting';

jest.mock('@/serializers/spotting');
jest.mock('@/services/notion');

describe('updateSpottedPlanes', () => {
  let mockedOk: boolean;
  let mockedData: object;

  const mockedID1 = 'mocked_id_1';
  const mockedAttributes1 = {
    attr1: 'attr 1',
  };
  const mockedData1 = {
    attributes: mockedAttributes1,
    id: mockedID1,
  };
  const mockedID2 = 'mocked_id_2';
  const mockedAttributes2 = {
    attr1: 'attr 2',
  };
  const mockedData2 = {
    attributes: mockedAttributes2,
    id: mockedID2,
  };
  const mockedBody = { data: [mockedData1] };
  const mockedBodyMultiple = { data: [mockedData1, mockedData2] };
  const mockedToken = 'mocked_token';
  const mockedRequestBody = JSON.stringify(mockedBody);
  const mockedRequestMultipleBody = JSON.stringify(mockedBodyMultiple);
  const mockedSerializedData = [
    {
      id: mockedID1,
      body: { properties: 'serialized properties 1', icon: 'icon 1' },
    },
  ];
  const mockedSerializedMultipleData = [
    ...mockedSerializedData,
    {
      id: mockedID2,
      body: { properties: 'serialized properties 2', icon: 'icon 2' },
    },
  ];
  const mockedErrorMessage = 'Not Authenticated';
  const mockedUpdatePage = jest.fn(async () => ({
    ok: mockedOk,
    data: mockedData,
  }));

  beforeAll(() => {
    (serializeSpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedSerializedData)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when response is ok', () => {
    beforeEach(() => {
      mockedOk = true;
      mockedData = { id: mockedID1 };
      (NotionService as unknown as jest.Mock).mockImplementation(() => ({
        updatePage: mockedUpdatePage,
      }));
    });

    test('updates data', async () => {
      // Arrange
      const mockedNotionService = new NotionService(mockedToken);
      const expectedResult = {
        status: 200,
        responseBody: {
          data: [{ id: mockedID1, ok: true, error: undefined }],
        },
      };
      // Act
      const result = await updateSpottedPlanes(
        mockedNotionService,
        mockedRequestBody
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializeSpottedPlanes).toHaveBeenCalledTimes(1);
      expect(serializeSpottedPlanes).toHaveBeenCalledWith(mockedBody.data);
      expect(mockedNotionService.updatePage).toHaveBeenCalledTimes(1);
      expect(mockedNotionService.updatePage).toHaveBeenCalledWith(mockedID1, {
        ...mockedSerializedData[0].body,
      });
    });

    describe('when update multiple items', () => {
      beforeEach(() => {
        (serializeSpottedPlanes as unknown as jest.Mock).mockImplementation(
          jest.fn(() => mockedSerializedMultipleData)
        );
      });

      test('updates data', async () => {
        // Arrange
        const mockedNotionService = new NotionService(mockedToken);
        const expectedResult = {
          status: 200,
          responseBody: {
            data: [
              { id: mockedID1, ok: true, error: undefined },
              { id: mockedID1, ok: true, error: undefined },
            ],
          },
        };
        // Act
        const result = await updateSpottedPlanes(
          mockedNotionService,
          mockedRequestMultipleBody
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(serializeSpottedPlanes).toHaveBeenCalledTimes(1);
        expect(serializeSpottedPlanes).toHaveBeenCalledWith(
          mockedBodyMultiple.data
        );
        expect(mockedNotionService.updatePage).toHaveBeenCalledTimes(2);
        expect(mockedNotionService.updatePage).toHaveBeenNthCalledWith(
          1,
          mockedID1,
          { ...mockedSerializedMultipleData[0].body }
        );
        expect(mockedNotionService.updatePage).toHaveBeenNthCalledWith(
          2,
          mockedID2,
          { ...mockedSerializedMultipleData[1].body }
        );
      });
    });
  });

  describe('when response is not ok', () => {
    beforeEach(() => {
      mockedOk = false;
      (NotionService as unknown as jest.Mock).mockImplementationOnce(() => ({
        updatePage: mockedUpdatePage,
      }));
    });

    test('returns error', async () => {
      // Arrange
      mockedData = { status: 401, message: mockedErrorMessage };
      const mockedNotionService = new NotionService(mockedToken);
      const expectedResult = {
        status: 401,
        responseBody: { error: mockedData },
      };
      // Act
      const result = await updateSpottedPlanes(
        mockedNotionService,
        mockedRequestBody
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(serializeSpottedPlanes).toHaveBeenCalledTimes(1);
      expect(serializeSpottedPlanes).toHaveBeenCalledWith(mockedBody.data);
      expect(mockedNotionService.updatePage).toHaveBeenCalledTimes(1);
      expect(mockedNotionService.updatePage).toHaveBeenCalledWith(mockedID1, {
        ...mockedSerializedData[0].body,
      });
    });
  });
});
