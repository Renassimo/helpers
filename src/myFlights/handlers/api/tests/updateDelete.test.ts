import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

import NotionService from '@/common/services/notion';
import { getError } from '@/common/utils/errors';

import updateMyFlight from '@/myFlights/handlers/myFlights/updateMyFlight';
import deleteMyFlight from '@/myFlights/handlers/myFlights/deleteMyFlight';

import handler from '@/myFlights/handlers/api/updateDelete';

jest.mock('@/common/services/notion');
jest.mock('@/myFlights/handlers/myFlights/updateMyFlight');
jest.mock('@/myFlights/handlers/myFlights/deleteMyFlight');
jest.mock('@/common/utils/errors');

describe('create my flight handler', () => {
  const mockedData = { status: 200, responseBody: 'mocked-data' };
  const mockedMethod = 'PATCH';
  const mockedToken = 'mocked token';
  const mockedFlightsDbID = 'mocked-data-base-id';
  const mockedNotionHelperData = {
    token: mockedToken,
    dataBaseID: mockedFlightsDbID,
  };
  const mockedPageId = 'page-id';
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
    query: { id: mockedPageId },
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

  const mockedUpdateMyFlight = jest.fn(() => mockedData);
  const mockedDeleteMyFlight = jest.fn(() => mockedData);

  beforeEach(() => {
    (NotionService as unknown as jest.Mock).mockImplementation(
      mockedNotionServiceConstructor
    );
    (updateMyFlight as unknown as jest.Mock).mockImplementation(
      mockedUpdateMyFlight
    );
    (deleteMyFlight as unknown as jest.Mock).mockImplementation(
      mockedDeleteMyFlight
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
    expect(mockedUpdateMyFlight).toHaveBeenCalledWith(
      mockedNotionServiceInstance,
      mockedPageId,
      mockedBody
    );
    expect(mockedDeleteMyFlight).not.toHaveBeenCalled();
    expect(mockedStatus).toHaveBeenCalledWith(mockedStatusCode);
    expect(mockedJson).toHaveBeenCalledWith(mockedData.responseBody);
  });

  describe('when method is DELETE', () => {
    test('writes status and data to response', async () => {
      // Arange
      // Act
      const mockedReq = {
        ...req,
        method: 'DELETE',
      } as unknown as NextApiRequestWithAuth;
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedNotionServiceConstructor).toHaveBeenCalledWith(mockedToken);
      expect(mockedDeleteMyFlight).toHaveBeenCalledWith(
        mockedNotionServiceInstance,
        mockedPageId
      );
      expect(mockedUpdateMyFlight).not.toHaveBeenCalled();
      expect(mockedStatus).toHaveBeenCalledWith(mockedStatusCode);
      expect(mockedJson).toHaveBeenCalledWith({});
    });
  });

  describe('when catches error', () => {
    test('writes status and error to response', async () => {
      // Arange
      (mockedUpdateMyFlight as unknown as jest.Mock).mockImplementation(() => {
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
      (mockedUpdateMyFlight as unknown as jest.Mock).mockImplementation(() => {
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
