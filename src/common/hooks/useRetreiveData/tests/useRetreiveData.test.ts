import { act, cleanup, renderHook } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import { useErrorAlert } from '@/common/hooks/alerts';

import useRetreiveData from '../useRetreiveData';

jest.mock('@/common/hooks/alerts');

describe('useRetreiveData', () => {
  const defaultState = {
    data: null,
    retreive: expect.any(Function),
    loading: false,
    error: null,
  };

  const mockedUrl = '/mocked-url';
  const mockedResponseData = { hello: 'world' };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    fetchMock.reset();
  });

  test('returns default state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useRetreiveData());
    // Assert
    expect(result.current).toEqual(defaultState);
  });

  describe('when url passed to hook', () => {
    test('retreives data and returns updated state', async () => {
      // Arange
      fetchMock.get(mockedUrl, mockedResponseData);
      // Act
      const { result } = await renderHook(() => useRetreiveData(mockedUrl));
      await act(async () => {});
      // Assert
      expect(result.current).toEqual({
        ...defaultState,
        data: mockedResponseData,
      });
      expect(fetchMock.lastUrl()).toEqual(mockedUrl);
      expect(fetchMock.lastOptions()).toEqual(undefined);
    });
  });

  describe('when retreives data', () => {
    test('returns updated state', async () => {
      // Arange
      fetchMock.get(mockedUrl, mockedResponseData);
      const { result } = renderHook(() => useRetreiveData());
      // Act
      let responseData: string | null = '';
      await act(async () => {
        responseData = (await result.current.retreive(
          mockedUrl
        )) as unknown as string;
      });
      // Assert
      expect(result.current).toEqual({
        ...defaultState,
        data: mockedResponseData,
      });
      expect(fetchMock.lastUrl()).toEqual(mockedUrl);
      expect(fetchMock.lastOptions()).toEqual(undefined);
      expect(responseData).toEqual(mockedResponseData);
    });
  });

  describe('when catches error', () => {
    test('returns updated state', async () => {
      // Arange
      const mockedError = new Error('Error happened');
      const mockedFetch = jest.fn(() => ({
        ok: false,
        json: () => {
          throw mockedError;
        },
      }));
      Object.defineProperty(globalThis, 'fetch', {
        value: mockedFetch,
      });

      (useErrorAlert as unknown as jest.Mock).mockImplementationOnce(jest.fn());

      const { result } = renderHook(() => useRetreiveData());
      // Act
      let responseData: string | null = '';
      await act(async () => {
        responseData = (await result.current.retreive(
          mockedUrl
        )) as unknown as string;
      });
      // Assert
      expect(result.current).toEqual({ ...defaultState, error: mockedError });
      expect(useErrorAlert).toHaveBeenCalledWith(mockedError);
      expect(responseData).toEqual(null);
    });
  });
});
