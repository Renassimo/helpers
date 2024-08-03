import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import MapOnImage from '@/common/lib/leaflet/components/MapOnImage';
import MapMarker from '@/common/lib/leaflet/components/MapMarker';

import usePlay from '@/gameMaps/hooks/usePlay';
import useAddItemOnMap from '@/gameMaps/hooks/useAddItemOnMap';
import ItemFormModal from '@/gameMaps/components/ItemFormModal';

import MockedMapOnImage from '@/common/lib/leaflet/components/MapOnImage/mocks';
import MockedMapMarker from '@/common/lib/leaflet/components/MapMarker/mocks';
import MockedItemFormModal from '@/gameMaps/components/ItemFormModal/mocks';
import {
  mockedCategory1,
  mockedCategory2,
  mockedGame,
  mockedItem1,
  mockedItem2,
  mockedItems,
  mockedPlay,
} from '@/gameMaps/types/mocks';

import PlayMap from '../PlayMap';

jest.mock('@/common/lib/leaflet/components/MapOnImage');
jest.mock('@/common/lib/leaflet/components/MapMarker');
jest.mock('@/gameMaps/components/ItemFormModal');
jest.mock('@/gameMaps/hooks/usePlay');
jest.mock('@/gameMaps/hooks/useAddItemOnMap');

describe('PlayMap', () => {
  const mockedPointingCategoryId = mockedCategory2.id;
  const mockedVisibleItems = mockedItems;
  const itemsState = {
    [mockedItem1.id]: mockedItem1,
    [mockedItem2.id]: mockedItem2,
  };
  const mockedCategoriesState = {
    [mockedCategory1.id]: mockedCategory1,
    [mockedCategory2.id]: mockedCategory2,
  };
  const mockedOpenItemCreating = jest.fn();
  const mockedOpenItemUpdating = jest.fn();
  const mockedSetIsItemEditOpen = jest.fn();
  const mockedUpdateSubmittedItem = jest.fn();
  const mockedUsePlayResult = {
    game: mockedGame,
    play: mockedPlay,
    visibleItems: mockedVisibleItems,
    items: itemsState,
    categories: mockedCategoriesState,
    pointingCategoryId: null,
    openItemCreating: mockedOpenItemCreating,
    openItemUpdating: mockedOpenItemUpdating,
    isItemEditOpen: false,
    setIsItemEditOpen: mockedSetIsItemEditOpen,
    updateSubmittedItem: mockedUpdateSubmittedItem,
    editingItem: null,
  };
  const mockedUsePlay = jest.fn(() => mockedUsePlayResult);
  const mockedHandleMapClick = jest.fn();
  const mockedNewMarker = {
    attributes: {
      coordinates: [1, 2],
      description: 'new marker description',
      categoryId: mockedPointingCategoryId,
    },
  };
  const mockedAllMarkers = mockedItems;
  const mockedUseAddItemOnMapResult = {
    allMarkers: mockedAllMarkers,
    handleMapClick: mockedHandleMapClick,
    newMarker: null,
  };
  const mockedUseAddItemOnMap = jest.fn(() => mockedUseAddItemOnMapResult);

  beforeEach(() => {
    (MapOnImage as unknown as jest.Mock).mockImplementation(MockedMapOnImage);
    (MapMarker as unknown as jest.Mock).mockImplementation(MockedMapMarker);
    (ItemFormModal as unknown as jest.Mock).mockImplementation(
      MockedItemFormModal
    );
    (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
    (useAddItemOnMap as unknown as jest.Mock).mockImplementation(
      mockedUseAddItemOnMap
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PlayMap />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(mockedUsePlay).toHaveBeenCalledWith();
    expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
      categories: mockedCategoriesState,
      pointingCategoryId: null,
      visibleItems: mockedVisibleItems,
      onAdd: expect.any(Function),
    });
  });

  describe('when open for editing', () => {
    test('renders successfully with mocked modal', () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        editingItem: mockedItem1,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      // Act
      const { baseElement } = renderWithTheme(<PlayMap />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlay).toHaveBeenCalledWith();
      expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
        categories: mockedCategoriesState,
        pointingCategoryId: null,
        visibleItems: mockedVisibleItems,
        onAdd: expect.any(Function),
      });
    });
  });

  describe('when open for creating and new marker passed', () => {
    test('renders successfully with mocked modal', () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: mockedPointingCategoryId,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const mockedUseAddItemOnMap = jest.fn(() => ({
        ...mockedUseAddItemOnMapResult,
        allMarkers: [...mockedAllMarkers, mockedNewMarker],
        newMarker: mockedNewMarker,
      }));
      (useAddItemOnMap as unknown as jest.Mock).mockImplementation(
        mockedUseAddItemOnMap
      );
      // Act
      const { baseElement } = renderWithTheme(<PlayMap />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlay).toHaveBeenCalledWith();
      expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
        categories: mockedCategoriesState,
        pointingCategoryId: mockedPointingCategoryId,
        visibleItems: mockedVisibleItems,
        onAdd: expect.any(Function),
      });
    });
  });

  describe('when clicks to edit item', () => {
    test('calls mockedOpenItemUpdating', async () => {
      // Arange
      const { getAllByLabelText } = renderWithTheme(<PlayMap />);
      // Act
      await userEvent.click(getAllByLabelText('edit-item')[0]);
      // Assert
      expect(mockedOpenItemUpdating).toHaveBeenCalledWith(mockedItem1.id);
    });
  });
});
