import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

import NotionService from '@/common/services/notion';
import { getError } from '@/common/utils/errors';
import createMyFlight from '@/myFlights/handlers/myFlights/createMyFlight';

import handler from '@/myFlights/handlers/api/create';

jest.mock('@/common/services/notion');
jest.mock('@/myFlights/handlers/myFlights/createMyFlight');
jest.mock('@/common/utils/errors');

describe('create my flight handler', () => {
  const mockedData = { status: 200, responseBody: 'mocked-data' };
  const mockedMethod = 'POST';
  const mockedToken = 'mocked token';
  const mockedFlightsDbID = 'mocked-data-base-id';
  const mockedNotionHelperData = {
    token: mockedToken,
    dataBaseID: mockedFlightsDbID,
  };
  const mockedStatusCode = 200;
  const mockedErrorMessage = 'Error message';

  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedBody = 'req-body';
  const req = {
    method: mockedMethod,
    notionHelperData: mockedNotionHelperData,
    body: mockedBody,
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

  const mockedCreateMyFlight = jest.fn(() => mockedData);

  beforeEach(() => {
    (NotionService as unknown as jest.Mock).mockImplementation(
      mockedNotionServiceConstructor
    );
    (createMyFlight as unknown as jest.Mock).mockImplementation(
      mockedCreateMyFlight
    );
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
    expect(mockedCreateMyFlight).toHaveBeenCalledWith(
      mockedNotionServiceInstance,
      mockedFlightsDbID,
      mockedBody
    );
    expect(mockedStatus).toHaveBeenCalledWith(mockedStatusCode);
    expect(mockedJson).toHaveBeenCalledWith(mockedData.responseBody);
  });

  describe('when catches error', () => {
    test('writes status and error to response', async () => {
      // Arange
      (mockedCreateMyFlight as unknown as jest.Mock).mockImplementation(() => {
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
      (mockedCreateMyFlight as unknown as jest.Mock).mockImplementation(() => {
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
        method: 'GET',
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
