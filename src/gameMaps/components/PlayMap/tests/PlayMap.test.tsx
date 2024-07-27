import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import MapOnImage from '@/common/lib/leaflet/components/MapOnImage';
import MapMarker from '@/common/lib/leaflet/components/MapMarker';

import usePlay from '@/gameMaps/hooks/usePlay';
import useAddItemOnMap from '@/gameMaps/hooks/useAddItemOnMap';

import MockedMapOnImage from '@/common/lib/leaflet/components/MapOnImage/mocks';
import MockedMapMarker from '@/common/lib/leaflet/components/MapMarker/mocks';
import {
  mockedCategories,
  mockedCategory2,
  mockedGame,
  mockedItems,
} from '@/gameMaps/types/mocks';

import PlayMap from '../PlayMap';

jest.mock('@/common/lib/leaflet/components/MapOnImage');
jest.mock('@/common/lib/leaflet/components/MapMarker');
jest.mock('@/gameMaps/hooks/usePlay');
jest.mock('@/gameMaps/hooks/useAddItemOnMap');

describe('PlayMap', () => {
  const mockedPointingCategoryId = mockedCategory2.id;
  const mockedVisibleItems = mockedItems;
  const mockedUsePlay = jest.fn(() => ({
    game: mockedGame,
    visibleItems: mockedVisibleItems,
    categories: mockedCategories,
    pointingCategoryId: mockedPointingCategoryId,
  }));
  const mockedHandleMapClick = jest.fn();
  const mockedAllMarkers = mockedItems;
  const mockedUseAddItemOnMap = jest.fn(() => ({
    allMarkers: mockedAllMarkers,
    handleMapClick: mockedHandleMapClick,
  }));

  beforeEach(() => {
    (MapOnImage as unknown as jest.Mock).mockImplementation(MockedMapOnImage);
    (MapMarker as unknown as jest.Mock).mockImplementation(MockedMapMarker);
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
      categories: mockedCategories,
      pointingCategoryId: mockedPointingCategoryId,
      visibleItems: mockedVisibleItems,
    });
  });
});
