import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

import NotionService from '@/common/services/notion';
import { getError } from '@/common/utils/errors';
import getOptions from '@/myFlights/handlers/getOptions';

import handler from '@/myFlights/handlers/api/options/get';

jest.mock('@/common/services/notion');
jest.mock('@/myFlights/handlers/getOptions');
jest.mock('@/common/utils/errors');

describe('get options', () => {
  const mockedData = 'mocked-data';
  const mockedMethod = 'GET';
  const mockedToken = 'mocked token';
  const mockedDataBaseID = 'mocked-data-base-id';
  const mockedSpottingDbId = 'mocked-spotting-db-id';
  const mockedAdditionalDbIds = { spotting: mockedSpottingDbId };
  const mockedNotionHelperData = {
    token: mockedToken,
    dataBaseID: mockedDataBaseID,
    additionalDbIds: mockedAdditionalDbIds,
  };
  const mockedStatusCode = 200;
  const mockedErrorMessage = 'Error message';

  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const req = {
    method: mockedMethod,
    notionHelperData: mockedNotionHelperData,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  const mockedNotionServiceInstance = {
    someMethod: 'mockedNotionServiceMethod',
  };
  const mockedNotionServiceConstructor = jest.fn(
    () => mockedNotionServiceInstance
  );

  const mockedGetOptions = jest.fn(() => mockedData);

  beforeEach(() => {
    (NotionService as unknown as jest.Mock).mockImplementation(
      mockedNotionServiceConstructor
    );
    (getOptions as unknown as jest.Mock).mockImplementation(mockedGetOptions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writes status and data to response', async () => {
    // Arange
    // Act
    await handler(req, res);
    // Assert
    expect(mockedNotionServiceConstructor).toHaveBeenCalledWith(mockedToken);
    expect(mockedGetOptions).toHaveBeenCalledWith(
      mockedNotionServiceInstance,
      mockedDataBaseID,
      mockedSpottingDbId
    );
    expect(mockedStatus).toHaveBeenCalledWith(mockedStatusCode);
    expect(mockedJson).toHaveBeenCalledWith({ data: mockedData });
  });

  describe('when catches error', () => {
    test('writes status and error to response', async () => {
      // Arange
      (getOptions as unknown as jest.Mock).mockImplementation(() => {
        throw Error(mockedErrorMessage);
      });

      const expectedError = {
        error: 'expectedError',
      };
      const expectedStatusNumber = 500;

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        mockedErrorMessage
      );
    });
  });

  describe('when catches notion error', () => {
    test('writes status and error to response', async () => {
      // Arange
      (getOptions as unknown as jest.Mock).mockImplementation(() => {
        throw mockedNotionError418;
      });
      // Act
      await handler(req, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(418);
      expect(mockedJson).toHaveBeenCalledWith(mockedNotionError418);
    });
  });

  describe('when method is not allowed', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedReq = {
        ...req,
        method: 'POST',
      } as unknown as NextApiRequestWithAuth;

      const expectedStatusNumber = 405;
      const expectedError = {
        error: 'expectedError',
      };
      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(expectedStatusNumber);
    });
  });
});
