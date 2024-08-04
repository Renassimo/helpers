import { act, renderHook } from '@testing-library/react';

import {
  mockedCategory1,
  mockedCategory2,
  mockedItem2,
} from '@/gameMaps/types/mocks';
import { LeafletMouseEvent } from 'leaflet';

import renderSaveMarkerPopupContent from '@/common/lib/leaflet/utils/renderSaveMarkerPopupContent';

import useAlerts from '@/common/hooks/alerts';

import useAddItemOnMap from '../useAddItemOnMap';

jest.mock('@/common/lib/leaflet/utils/renderSaveMarkerPopupContent');
jest.mock('@/common/hooks/alerts');

describe('useAddItemOnMap', () => {
  const categoriesState = {
    [mockedCategory1.id]: mockedCategory1,
    [mockedCategory2.id]: mockedCategory2,
  };
  const mockedEvent = {
    latlng: { lat: 1.5, lng: 10.5 },
  } as unknown as LeafletMouseEvent;
  const mockedPopupContent = 'popup-content';
  const mockedRenderSaveMarkerPopupContent = jest.fn(() => mockedPopupContent);
  const mockedCreateInfoAlert = jest.fn();
  const mockedClearAll = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createInfoAlert: mockedCreateInfoAlert,
    clearAll: mockedClearAll,
  }));
  const mockedOnAdd = jest.fn();
  const mockedUpdateItemCoordinates = jest.fn();

  beforeEach(() => {
    (renderSaveMarkerPopupContent as unknown as jest.Mock).mockImplementation(
      mockedRenderSaveMarkerPopupContent
    );
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    categories: categoriesState,
    pointingCategoryId: null,
    onAdd: mockedOnAdd,
    relocatingItem: null,
    updateItemCoordinates: mockedUpdateItemCoordinates,
  };

  test('returns state', async () => {
    // Arange
    const expectedResult = {
      handleMapClick: expect.any(Function),
      newMarker: null,
      relocatingMarker: null,
    };
    const mockedProps = defaultProps;
    // Act
    const { result } = renderHook(() => useAddItemOnMap(mockedProps));
    // Assert
    expect(result.current).toEqual(expectedResult);
    expect(mockedRenderSaveMarkerPopupContent).not.toHaveBeenCalled();
    expect(mockedUseAlerts).toBeCalledWith();
    expect(mockedCreateInfoAlert).not.toBeCalled();
    expect(mockedClearAll).toBeCalledTimes(1);
  });

  describe('when handleMapClick called', () => {
    test('returns state without changes', async () => {
      // Arange
      const expectedResult = {
        handleMapClick: expect.any(Function),
        newMarker: null,
        relocatingMarker: null,
      };
      const mockedProps = defaultProps;

      const { result } = renderHook(() => useAddItemOnMap(mockedProps));
      // Act
      await act(async () => {
        await result.current.handleMapClick(mockedEvent);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
      expect(mockedRenderSaveMarkerPopupContent).not.toHaveBeenCalled();
      expect(mockedUseAlerts).toBeCalledWith();
      expect(mockedCreateInfoAlert).not.toBeCalled();
      expect(mockedClearAll).toBeCalledTimes(1);
    });
  });

  describe('when pointingCategoryId is selected', () => {
    const mockedPointingCategoryId = mockedCategory2.id;

    test('returns state', async () => {
      // Arange
      const expectedResult = {
        handleMapClick: expect.any(Function),
        newMarker: null,
        relocatingMarker: null,
      };
      const mockedProps = {
        ...defaultProps,
        pointingCategoryId: mockedPointingCategoryId,
      };
      // Act
      const { result } = renderHook(() => useAddItemOnMap(mockedProps));
      // Assert
      expect(result.current).toEqual(expectedResult);
      expect(mockedRenderSaveMarkerPopupContent).not.toHaveBeenCalled();
      expect(mockedUseAlerts).toBeCalledWith();
      expect(mockedCreateInfoAlert).toBeCalledTimes(1);
      expect(mockedCreateInfoAlert).toBeCalledWith(
        'Point on map to create a new Category 2 item',
        0
      );
      expect(mockedClearAll).toBeCalledTimes(1);
      expect(mockedClearAll).toBeCalledWith();
    });

    describe('when handleMapClick called', () => {
      test('returns updated state', async () => {
        // Arange
        const expectedNewMarker = {
          attributes: {
            coordinates: [mockedEvent.latlng.lat, mockedEvent.latlng.lng],
            description: mockedPopupContent,
            categoryId: mockedPointingCategoryId,
          },
        };
        const expectedResult = {
          handleMapClick: expect.any(Function),
          newMarker: expectedNewMarker,
          relocatingMarker: null,
        };
        const mockedProps = {
          ...defaultProps,
          pointingCategoryId: mockedPointingCategoryId,
        };

        const { result } = renderHook(() => useAddItemOnMap(mockedProps));
        // Act
        await act(async () => {
          await result.current.handleMapClick(mockedEvent);
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
        expect(mockedUseAlerts).toBeCalledWith();
        expect(mockedRenderSaveMarkerPopupContent).toHaveBeenNthCalledWith(1, {
          onAdd: expect.any(Function),
          onCancel: expect.any(Function),
          text: 'Add new Category 2 item?',
        });
        expect(mockedRenderSaveMarkerPopupContent).toHaveBeenNthCalledWith(2, {
          onAdd: expect.any(Function),
          onCancel: expect.any(Function),
          text: 'Add new Category 2 item?',
        });
        expect(mockedCreateInfoAlert).toBeCalledTimes(2);
        expect(mockedCreateInfoAlert).toHaveBeenNthCalledWith(
          1,
          'Point on map to create a new Category 2 item',
          0
        );
        expect(mockedCreateInfoAlert).toHaveBeenNthCalledWith(
          2,
          mockedPopupContent,
          0
        );
        expect(mockedClearAll).toBeCalledTimes(2);
        expect(mockedClearAll).toHaveBeenNthCalledWith(1);
        expect(mockedClearAll).toHaveBeenNthCalledWith(2);
      });
    });

    describe('when pointingCategoryId is removed', () => {
      test('returns default state', async () => {
        // Arange
        const expectedResult = {
          handleMapClick: expect.any(Function),
          newMarker: null,
          relocatingMarker: null,
        };
        const mockedProps = {
          ...defaultProps,
          pointingCategoryId: mockedPointingCategoryId,
        };
        const { result, rerender } = renderHook(
          (props) => useAddItemOnMap(props),
          { initialProps: mockedProps }
        );
        await act(async () => {
          await result.current.handleMapClick(mockedEvent);
        });
        // Act
        rerender({
          ...mockedProps,
          pointingCategoryId: null!,
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
        expect(mockedRenderSaveMarkerPopupContent).toHaveBeenCalled();
        expect(mockedUseAlerts).toBeCalledWith();
        expect(mockedCreateInfoAlert).toBeCalledTimes(2);
        expect(mockedClearAll).toBeCalledTimes(3);
        expect(mockedClearAll).toBeCalledWith();
      });
    });
  });

  describe('when relocatingItem is selected', () => {
    const mockedRelocatingItem = mockedItem2;

    test('returns state', async () => {
      // Arange
      const expectedResult = {
        handleMapClick: expect.any(Function),
        newMarker: null,
        relocatingMarker: null,
      };
      const mockedProps = {
        ...defaultProps,
        relocatingItem: mockedRelocatingItem,
      };
      // Act
      const { result } = renderHook(() => useAddItemOnMap(mockedProps));
      // Assert
      expect(result.current).toEqual(expectedResult);
      expect(mockedRenderSaveMarkerPopupContent).not.toHaveBeenCalled();
      expect(mockedUseAlerts).toBeCalledWith();
      expect(mockedCreateInfoAlert).toBeCalledTimes(1);
      expect(mockedCreateInfoAlert).toBeCalledWith(
        'Point on map to change Category 1 item coordinates',
        0
      );
      expect(mockedClearAll).toBeCalledTimes(2);
      expect(mockedClearAll).toBeCalledWith();
    });

    describe('when handleMapClick called', () => {
      test('returns updated state', async () => {
        // Arange
        const expectedResult = {
          handleMapClick: expect.any(Function),
          newMarker: null,
          relocatingMarker: {
            ...mockedRelocatingItem,
            attributes: {
              coordinates: [1.5, 10.5],
              description: mockedPopupContent,
              categoryId: mockedRelocatingItem.attributes.categoryId,
            },
          },
        };
        const mockedProps = {
          ...defaultProps,
          relocatingItem: mockedRelocatingItem,
        };

        const { result } = renderHook(() => useAddItemOnMap(mockedProps));
        // Act
        await act(async () => {
          await result.current.handleMapClick(mockedEvent);
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
        expect(mockedUseAlerts).toBeCalledWith();
        expect(mockedRenderSaveMarkerPopupContent).toHaveBeenNthCalledWith(1, {
          onAdd: expect.any(Function),
          onCancel: expect.any(Function),
          text: 'Relocate Category 1 item?',
        });
        expect(mockedRenderSaveMarkerPopupContent).toHaveBeenCalledTimes(1);
        expect(mockedCreateInfoAlert).toBeCalledTimes(2);
        expect(mockedCreateInfoAlert).toHaveBeenNthCalledWith(
          1,
          'Point on map to change Category 1 item coordinates',
          0
        );
        expect(mockedCreateInfoAlert).toHaveBeenNthCalledWith(
          2,
          mockedPopupContent,
          0
        );
        expect(mockedClearAll).toBeCalledTimes(3);
        expect(mockedClearAll).toHaveBeenNthCalledWith(1);
        expect(mockedClearAll).toHaveBeenNthCalledWith(2);
        expect(mockedClearAll).toHaveBeenNthCalledWith(3);
      });
    });

    describe('when relocatingItem is removed', () => {
      test('returns default state', async () => {
        // Arange
        const expectedResult = {
          handleMapClick: expect.any(Function),
          newMarker: null,
          relocatingMarker: null,
        };
        const mockedProps = {
          ...defaultProps,
          relocatingItem: mockedRelocatingItem,
        };
        const { result, rerender } = renderHook(
          (props) => useAddItemOnMap(props),
          { initialProps: mockedProps }
        );
        await act(async () => {
          await result.current.handleMapClick(mockedEvent);
        });
        // Act
        rerender({
          ...mockedProps,
          relocatingItem: null!,
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
        expect(mockedRenderSaveMarkerPopupContent).toHaveBeenCalled();
        expect(mockedUseAlerts).toBeCalledWith();
        expect(mockedCreateInfoAlert).toBeCalledTimes(2);
        expect(mockedClearAll).toBeCalledTimes(3);
        expect(mockedClearAll).toBeCalledWith();
      });
    });
  });
});
