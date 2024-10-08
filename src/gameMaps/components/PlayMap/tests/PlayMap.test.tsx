import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import MapOnImage from '@/common/lib/leaflet/components/MapOnImage';
import MapMarker from '@/common/lib/leaflet/components/MapMarker';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';
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
  mockedPlay,
} from '@/gameMaps/types/mocks';

import PlayMap from '../PlayMap';

jest.mock('@/common/lib/leaflet/components/MapOnImage');
jest.mock('@/common/lib/leaflet/components/MapMarker');
jest.mock('@/gameMaps/components/ItemFormModal');
jest.mock('@/gameMaps/contexts/hooks/usePlayContext');
jest.mock('@/gameMaps/hooks/useAddItemOnMap');

describe('PlayMap', () => {
  // to check category filtering
  const mockedAdditionalItem = {
    id: 'item-id',
    attributes: {
      ...mockedItem1.attributes,
      categoryId: 'category-id',
    },
  };
  const mockedRecentItem = {
    id: 'recent-item',
    attributes: {
      ...mockedItem1.attributes,
      description: 'Recent item description',
      recent: true,
    },
  };
  const mockedPointingCategoryId = mockedCategory2.id;
  const mockedVisibleItems = [
    mockedItem1,
    mockedItem2,
    mockedAdditionalItem,
    mockedRecentItem,
  ];
  const itemsState = {
    [mockedItem1.id]: mockedItem1,
    [mockedItem2.id]: mockedItem2,
    'item-id': mockedAdditionalItem,
    [mockedRecentItem.id]: mockedRecentItem,
  };
  const mockedCategoriesState = {
    [mockedCategory1.id]: mockedCategory1,
    [mockedCategory2.id]: mockedCategory2,
  };
  const mockedOpenItemCreating = jest.fn();
  const mockedOpenItemUpdating = jest.fn();
  const mockedSetIsItemEditOpen = jest.fn();
  const mockedUpdateSubmittedItem = jest.fn();
  const mockedRelocateItem = jest.fn();
  const mockedUpdateItemCoordinates = jest.fn();
  const mockedRelocatingItem = mockedItem1;
  const mockedUpdateItemCollection = jest.fn();
  const mockedItemCollectionUpdating = false;
  const mockedClearItemEditing = jest.fn();
  const mockedUsePlayContextResult = {
    game: {
      ...mockedGame,
      attributes: { ...mockedGame.attributes, mapImageRatio: 2 },
    },
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
    relocateItem: mockedRelocateItem,
    relocatingItem: null,
    updateItemCoordinates: mockedUpdateItemCoordinates,
    updateItemCollection: mockedUpdateItemCollection,
    itemCollectionUpdating: mockedItemCollectionUpdating,
    clearItemEditing: mockedClearItemEditing,
  };
  const mockedUsePlayContext = jest.fn(() => mockedUsePlayContextResult);
  const mockedHandleMapClick = jest.fn();
  const mockedNewMarker = {
    attributes: {
      coordinates: [1, 2],
      description: 'new marker description',
      categoryId: mockedPointingCategoryId,
    },
  };
  const mockedUseAddItemOnMapResult = {
    handleMapClick: mockedHandleMapClick,
    newMarker: null,
    relocatingMarker: null,
  };
  const mockedUseAddItemOnMap = jest.fn(() => mockedUseAddItemOnMapResult);

  beforeEach(() => {
    (MapOnImage as unknown as jest.Mock).mockImplementation(MockedMapOnImage);
    (MapMarker as unknown as jest.Mock).mockImplementation(MockedMapMarker);
    (ItemFormModal as unknown as jest.Mock).mockImplementation(
      MockedItemFormModal
    );
    (usePlayContext as unknown as jest.Mock).mockImplementation(
      mockedUsePlayContext
    );
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
    expect(mockedUsePlayContext).toHaveBeenCalledWith();
    expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
      categories: mockedCategoriesState,
      pointingCategoryId: null,
      onAdd: expect.any(Function),
      relocatingItem: null,
      updateItemCoordinates: expect.any(Function),
    });
  });

  describe('when clecks to Toggle show recent items', () => {
    test('renders successfully', async () => {
      // Arange
      const { baseElement, getByLabelText } = renderWithTheme(<PlayMap />);
      // Act
      await userEvent.click(getByLabelText('Toggle show recent items'));
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlayContext).toHaveBeenCalledWith();
      expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
        categories: mockedCategoriesState,
        pointingCategoryId: null,
        onAdd: expect.any(Function),
        relocatingItem: null,
        updateItemCoordinates: expect.any(Function),
      });
    });
  });

  describe('when open for editing', () => {
    test('renders successfully with mocked modal', () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayContextResult,
        editingItem: mockedItem1,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      // Act
      const { baseElement } = renderWithTheme(<PlayMap />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlayContext).toHaveBeenCalledWith();
      expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
        categories: mockedCategoriesState,
        pointingCategoryId: null,
        onAdd: expect.any(Function),
        relocatingItem: null,
        updateItemCoordinates: expect.any(Function),
      });
      expect(MockedItemFormModal).toHaveBeenCalledWith(
        {
          isModalOpen: false,
          setIsModalOpen: mockedSetIsItemEditOpen,
          onFinish: mockedUpdateSubmittedItem,
          gameId: mockedGame.id,
          categoryId: mockedCategory1.id,
          playId: mockedPlay.id,
          coordinates: mockedItem1.attributes.coordinates,
          data: mockedItem1,
          clearData: mockedClearItemEditing,
        },
        {}
      );
    });
  });

  describe('when open for creating and new marker passed', () => {
    test('renders successfully with mocked modal', () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayContextResult,
        pointingCategoryId: mockedPointingCategoryId,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      const mockedUseAddItemOnMap = jest.fn(() => ({
        ...mockedUseAddItemOnMapResult,
        newMarker: mockedNewMarker,
      }));
      (useAddItemOnMap as unknown as jest.Mock).mockImplementation(
        mockedUseAddItemOnMap
      );
      // Act
      const { baseElement } = renderWithTheme(<PlayMap />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlayContext).toHaveBeenCalledWith();
      expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
        categories: mockedCategoriesState,
        pointingCategoryId: mockedPointingCategoryId,
        onAdd: expect.any(Function),
        relocatingItem: null,
        updateItemCoordinates: expect.any(Function),
      });
    });
  });

  describe('when relocating item passed', () => {
    test('renders successfully', () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayContextResult,
        relocatingItem: mockedRelocatingItem,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      const mockedUseAddItemOnMap = jest.fn(() => ({
        ...mockedUseAddItemOnMapResult,
        relocatingMarker: mockedRelocatingItem,
      }));
      (useAddItemOnMap as unknown as jest.Mock).mockImplementation(
        mockedUseAddItemOnMap
      );
      // Act
      const { baseElement } = renderWithTheme(<PlayMap />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlayContext).toHaveBeenCalledWith();
      expect(mockedUseAddItemOnMap).toHaveBeenCalledWith({
        categories: mockedCategoriesState,
        pointingCategoryId: null,
        onAdd: expect.any(Function),
        relocatingItem: mockedRelocatingItem,
        updateItemCoordinates: expect.any(Function),
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
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedOpenItemUpdating).toHaveBeenCalledWith(mockedItem1.id);
      expect(mockedUpdateItemCollection).not.toHaveBeenCalled();
    });
  });

  describe('when clicks to relocate item', () => {
    test('calls mockedRelocateItem', async () => {
      // Arange
      const { getAllByLabelText } = renderWithTheme(<PlayMap />);
      // Act
      await userEvent.click(getAllByLabelText('edit-coordinates')[0]);
      // Assert
      expect(mockedRelocateItem).toHaveBeenCalledWith(mockedItem1.id);
      expect(mockedOpenItemUpdating).not.toHaveBeenCalled();
      expect(mockedUpdateItemCollection).not.toHaveBeenCalled();
    });
  });

  describe('when clicks to collection item', () => {
    test('calls mockedUpdateItemCollection', async () => {
      // Arange
      const { getAllByLabelText } = renderWithTheme(<PlayMap />);
      // Act
      await userEvent.click(getAllByLabelText('Collected')[0]);
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedOpenItemUpdating).not.toHaveBeenCalled();
      expect(mockedUpdateItemCollection).toHaveBeenCalledWith(
        mockedItem1.id,
        !mockedItem1.attributes.collected
      );
    });
  });
});
