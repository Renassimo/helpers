import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import handler from '../get';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';
import { deserializeAirports } from '@/avia/serializers/aeroDataBox';

import { mockedAirports } from '@/avia/types/aeroDataBox/mocks';
import { mockedDeserializedAirports } from '@/avia/types/avia/mocks';

jest.mock('@/common/utils/errors');

jest.mock('@/avia/services/aeroDataBox');
jest.mock('@/avia/serializers/aeroDataBox');

describe('get (airports)', () => {
  const mockedMethod = 'GET';
  const mockedAirport = mockedAirports[0];
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedXRapidapiKey = 'xRapidapiKey';
  const mockedAeroDataBoxHelperData = { xRapidapiKey: mockedXRapidapiKey };
  const getReq = (query: Record<string, string>) => {
    return {
      method: mockedMethod,
      query,
      aeroDataBoxHelperData: mockedAeroDataBoxHelperData,
    } as unknown as NextApiRequestWithAuth;
  };
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  let mockedRetreiveAirportByCode = jest.fn(() => mockedAirport);
  let mockedRetreiveAirportByLocation = jest.fn(() => [mockedAirport]);
  let mockedRetreiveAirportByText = jest.fn(() => [mockedAirport]);

  const mockedAeroDataBoxServiceConstructor = jest.fn(() => ({
    retreiveAirportByCode: mockedRetreiveAirportByCode,
    retreiveAirportsByLocation: mockedRetreiveAirportByLocation,
    retreiveAirportsByText: mockedRetreiveAirportByText,
  }));

  const mockedDeserializeAirports = jest.fn(() => mockedDeserializedAirports);

  beforeEach(() => {
    (AeroDataBoxService as unknown as jest.Mock).mockImplementationOnce(
      mockedAeroDataBoxServiceConstructor
    );
    (deserializeAirports as unknown as jest.Mock).mockImplementationOnce(
      mockedDeserializeAirports
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when iata code passed', () => {
    const code = 'WAW';

    test('writes status and data to response', async () => {
      // Arange
      mockedRetreiveAirportByCode = jest.fn(() => mockedAirport);
      // Act
      await handler(getReq({ code }), res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAirportByCode).toHaveBeenCalledWith(code, 'iata');
      expect(deserializeAirports).toHaveBeenCalledWith([mockedAirport]);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({
        data: mockedDeserializedAirports,
      });
    });

    describe('when receives error in data', () => {
      test('writes status and data to response', async () => {
        // Arange
        const mockedErrorMessage = 'Something went wrong.';
        const mockedData = {
          message: mockedErrorMessage,
        } as unknown as AeroDataBoxApi.AirportExact;
        mockedRetreiveAirportByCode = jest.fn(() => mockedData);
        const expectedStatusNumber = 500;
        const expectedErrorMessage = 'expectedError';
        const expectedError = new Error(expectedErrorMessage);

        const mockedGetError = jest.fn(() => expectedError);
        (getError as unknown as jest.Mock).mockImplementationOnce(
          mockedGetError
        );
        // Act
        await handler(getReq({ code }), res);
        // Assert
        expect(deserializeAirports).not.toHaveBeenCalled();
        expect(mockedStatus).toHaveBeenCalledWith(500);
        expect(mockedJson).toHaveBeenCalledWith(expectedError);
        expect(mockedGetError).toHaveBeenCalledWith(
          expectedStatusNumber,
          mockedErrorMessage
        );
      });
    });
  });

  describe('when icao code passed', () => {
    const code = 'UWKD';

    test('writes status and data to response', async () => {
      // Arange
      mockedRetreiveAirportByCode = jest.fn(() => mockedAirport);
      // Act
      await handler(getReq({ code }), res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAirportByCode).toHaveBeenCalledWith(code, 'icao');
      expect(mockedRetreiveAirportByLocation).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByText).not.toHaveBeenCalled();
      expect(deserializeAirports).toHaveBeenCalledWith([mockedAirport]);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({
        data: mockedDeserializedAirports,
      });
    });

    describe('when receives error in data', () => {
      test('writes status and data to response', async () => {
        // Arange
        const mockedErrorMessage = 'Something went wrong.';
        const mockedData = {
          message: mockedErrorMessage,
        } as unknown as AeroDataBoxApi.AirportExact;
        mockedRetreiveAirportByCode = jest.fn(() => mockedData);
        const expectedStatusNumber = 500;
        const expectedErrorMessage = 'expectedError';
        const expectedError = new Error(expectedErrorMessage);

        const mockedGetError = jest.fn(() => expectedError);
        (getError as unknown as jest.Mock).mockImplementationOnce(
          mockedGetError
        );
        // Act
        await handler(getReq({ code }), res);
        // Assert
        expect(deserializeAirports).not.toHaveBeenCalled();
        expect(mockedStatus).toHaveBeenCalledWith(500);
        expect(mockedJson).toHaveBeenCalledWith(expectedError);
        expect(mockedGetError).toHaveBeenCalledWith(
          expectedStatusNumber,
          mockedErrorMessage
        );
      });
    });
  });

  describe('when location passed', () => {
    const lat = 'lat';
    const lon = 'lon';

    test('writes status and data to response', async () => {
      // Arange
      mockedRetreiveAirportByLocation = jest.fn(() => [mockedAirport]);
      // Act
      await handler(getReq({ lat, lon }), res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAirportByCode).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByLocation).toHaveBeenCalledWith(lat, lon);
      expect(mockedRetreiveAirportByText).not.toHaveBeenCalled();
      expect(deserializeAirports).toHaveBeenCalledWith([mockedAirport]);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({
        data: mockedDeserializedAirports,
      });
    });

    describe('when receives error in data', () => {
      test('writes status and data to response', async () => {
        // Arange
        const mockedErrorMessage = 'Something went wrong.';
        const mockedData = {
          message: mockedErrorMessage,
        } as unknown as AeroDataBoxApi.Airport[];
        mockedRetreiveAirportByLocation = jest.fn(() => mockedData);
        const expectedStatusNumber = 500;
        const expectedErrorMessage = 'expectedError';
        const expectedError = new Error(expectedErrorMessage);

        const mockedGetError = jest.fn(() => expectedError);
        (getError as unknown as jest.Mock).mockImplementationOnce(
          mockedGetError
        );
        // Act
        await handler(getReq({ lat, lon }), res);
        // Assert
        expect(deserializeAirports).not.toHaveBeenCalled();
        expect(mockedStatus).toHaveBeenCalledWith(500);
        expect(mockedJson).toHaveBeenCalledWith(expectedError);
        expect(mockedGetError).toHaveBeenCalledWith(
          expectedStatusNumber,
          mockedErrorMessage
        );
      });
    });
  });

  describe('when text passed', () => {
    const text = 'text';

    test('writes status and data to response', async () => {
      // Arange
      mockedRetreiveAirportByText = jest.fn(() => [mockedAirport]);
      // Act
      await handler(getReq({ text }), res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAirportByCode).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByLocation).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByText).toHaveBeenCalledWith(text);
      expect(deserializeAirports).toHaveBeenCalledWith([mockedAirport]);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({
        data: mockedDeserializedAirports,
      });
    });

    describe('when receives error in data', () => {
      test('writes status and data to response', async () => {
        // Arange
        const mockedErrorMessage = 'Something went wrong.';
        const mockedData = {
          message: mockedErrorMessage,
        } as unknown as AeroDataBoxApi.Airport[];
        mockedRetreiveAirportByText = jest.fn(() => mockedData);
        const expectedStatusNumber = 500;
        const expectedErrorMessage = 'expectedError';
        const expectedError = new Error(expectedErrorMessage);

        const mockedGetError = jest.fn(() => expectedError);
        (getError as unknown as jest.Mock).mockImplementationOnce(
          mockedGetError
        );
        // Act
        await handler(getReq({ text }), res);
        // Assert
        expect(deserializeAirports).not.toHaveBeenCalled();
        expect(mockedStatus).toHaveBeenCalledWith(500);
        expect(mockedJson).toHaveBeenCalledWith(expectedError);
        expect(mockedGetError).toHaveBeenCalledWith(
          expectedStatusNumber,
          mockedErrorMessage
        );
      });
    });
  });

  describe('when passed code length not 3 or 4', () => {
    const code = 'long-code';

    test('request by text writes status and data to response', async () => {
      // Arange
      mockedRetreiveAirportByText = jest.fn(() => [mockedAirport]);
      // Act
      await handler(getReq({ code }), res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAirportByCode).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByLocation).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByText).toHaveBeenCalledWith(code);
      expect(deserializeAirports).toHaveBeenCalledWith([mockedAirport]);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({
        data: mockedDeserializedAirports,
      });
    });
  });

  describe('when wrong parameters passed passed', () => {
    const lat = 'text';

    test('throws 400, writes status and error to response', async () => {
      // Arange
      const expectedStatusNumber = 400;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(getReq({ lat }), res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAirportByCode).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByLocation).not.toHaveBeenCalled();
      expect(mockedRetreiveAirportByText).not.toHaveBeenCalledWith();
      expect(deserializeAirports).not.toHaveBeenCalled();
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        'Not all parameters provided'
      );
    });
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const code = 'WAW';
      const mockedErrorMessage = 'New Error';
      mockedRetreiveAirportByCode = jest.fn(() => {
        throw Error(mockedErrorMessage);
      });

      const expectedStatusNumber = 500;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(getReq({ code }), res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        mockedErrorMessage
      );
    });
  });

  describe('when method is not allowed', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedReq = {
        ...getReq({}),
        method: 'POST',
      } as unknown as NextApiRequestWithAuth;

      const expectedStatusNumber = 405;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);
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
