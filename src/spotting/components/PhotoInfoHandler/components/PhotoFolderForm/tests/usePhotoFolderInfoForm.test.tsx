import { renderHook, waitFor } from '@testing-library/react';

import { Avia } from '@/avia/types/avia';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';
import useLoadedValues from '@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues';

import { mockedPhotoFolder } from '@/spotting/types/mocks';

import usePhotoFolderInfoForm from '../hooks/usePhotoFolderInfoForm';

jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues');

describe('usePhotoFolderInfoForm', () => {
  const aircraftsResult = 'aircraftsResult' as unknown as Avia.AircraftsResult;
  const airportsResult = {
    chosenAirport: null,
  } as unknown as Avia.AirportsResult;
  const loadedValues = { someLoadedValue: 'someLoadedValue' };
  const airportCode = 'WAW/EPWA';
  const place = 'KZN/UWKD';

  beforeEach(() => {
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ place: null, showingFolder: null }))
    );
    (useLoadedValues as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ loadedValues }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      usePhotoFolderInfoForm({ aircraftsResult, airportsResult })
    );
    // Assert
    expect(result.current).toEqual({
      loadedValues,
      setFlown: expect.any(Function),
      placeCommon: null,
    });
    expect(usePhotoInfoContext).toBeCalledWith();
    expect(useLoadedValues).toBeCalledWith({
      aircraftsResult,
      place: null,
      date: null,
    });
  });

  describe('when chosenAirport passed', () => {
    test('returns state', async () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        usePhotoFolderInfoForm({
          aircraftsResult,
          airportsResult: {
            chosenAirport: { attributes: { airportCode } },
          } as unknown as Avia.AirportsResult,
        })
      );
      // Assert
      expect(result.current).toEqual({
        loadedValues,
        setFlown: expect.any(Function),
        placeCommon: null,
      });
      expect(usePhotoInfoContext).toBeCalledWith();
      expect(useLoadedValues).toBeCalledTimes(3);
      expect(useLoadedValues).nthCalledWith(2, {
        aircraftsResult,
        place: airportCode,
        date: null,
      });
    });
  });

  describe('when place passed', () => {
    beforeEach(() => {
      (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ place, showingFolder: null }))
      );
    });

    test('returns state', async () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        usePhotoFolderInfoForm({
          aircraftsResult,
          airportsResult,
        })
      );
      // Assert
      expect(result.current).toEqual({
        loadedValues,
        setFlown: expect.any(Function),
        placeCommon: place,
      });
      expect(usePhotoInfoContext).toBeCalledWith();
      expect(useLoadedValues).toBeCalledWith({
        aircraftsResult,
        place,
        date: null,
      });
    });
  });

  describe('when showingFolder passed', () => {
    beforeEach(() => {
      (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ place: null, showingFolder: mockedPhotoFolder }))
      );
    });

    test('returns state', async () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        usePhotoFolderInfoForm({
          aircraftsResult,
          airportsResult,
        })
      );
      // Assert
      expect(result.current).toEqual({
        loadedValues,
        setFlown: expect.any(Function),
        placeCommon: null,
      });
      expect(usePhotoInfoContext).toBeCalledWith();
      expect(useLoadedValues).toBeCalledWith({
        aircraftsResult,
        place: null,
        date: mockedPhotoFolder.photos['path1'].date,
      });
    });
  });

  describe('when setFlown called', () => {
    test('returns updated state', async () => {
      // Arange
      const { result } = renderHook(() =>
        usePhotoFolderInfoForm({
          aircraftsResult,
          airportsResult,
        })
      );
      // Act
      result.current.setFlown();
      // Assert
      await waitFor(() => {
        expect(result.current).toEqual({
          loadedValues: { ...loadedValues, flown: true },
          setFlown: expect.any(Function),
          placeCommon: null,
        });
      });
      expect(usePhotoInfoContext).toBeCalledWith();
      expect(useLoadedValues).toBeCalledWith({
        aircraftsResult,
        place: null,
        date: null,
      });
    });
  });
});
