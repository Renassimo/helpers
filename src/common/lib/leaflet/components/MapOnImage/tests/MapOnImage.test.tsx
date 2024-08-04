import { MapContainer, ImageOverlay } from 'react-leaflet';
import getMapBoundsAndCenter from '@/common/lib/leaflet/utils/getMapBoundsAndCenter';
import MapEventsHandler from '@/common/lib/leaflet/components/MapEventsHandler';

import MockedMapEventsHandler from '../../MapEventsHandler/mocks';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import MapOnImage from '../MapOnImage';

jest.mock('react-leaflet');
jest.mock('@/common/lib/leaflet/utils/getMapBoundsAndCenter');
jest.mock('@/common/lib/leaflet/components/MapEventsHandler');

describe('MapOnImage', () => {
  const mockeOnClick = jest.fn();
  const MockedMapContainer = jest.fn(
    ({ center, zoom, style, attributionControl, children }) => (
      <div>
        MockedMapContainer - {center} - {zoom} -{' '}
        {typeof style === 'object' && JSON.stringify(style)} -{' '}
        {attributionControl && 'with attributionControl'} - {children}
      </div>
    )
  );
  const MockedImageOverlay = jest.fn(({ url, bounds, opacity, zIndex }) => (
    <div>
      MockedImageOverlay - {url} -{' '}
      {typeof bounds === 'object' && JSON.stringify(bounds)} - {opacity} -{' '}
      {zIndex}
    </div>
  ));
  const mockedBoundAndCenter = { center: 'center', bounds: 'bounds' };
  const mockedGetMapBoundsAndCenter = jest.fn(() => mockedBoundAndCenter);

  beforeEach(() => {
    (MapEventsHandler as unknown as jest.Mock).mockImplementation(
      MockedMapEventsHandler
    );
    (MapContainer as unknown as jest.Mock).mockImplementation(
      MockedMapContainer
    );
    (ImageOverlay as unknown as jest.Mock).mockImplementation(
      MockedImageOverlay
    );
    (getMapBoundsAndCenter as unknown as jest.Mock).mockImplementation(
      mockedGetMapBoundsAndCenter
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <MapOnImage
        onClick={mockeOnClick}
        mapImageUrl="mapImageUrl"
        backgroundColor="backgroundColor"
      >
        Children
      </MapOnImage>
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MapEventsHandler).toHaveBeenCalledWith(
      {
        handleMapClick: mockeOnClick,
      },
      {}
    );
    expect(MockedImageOverlay).toHaveBeenCalledWith(
      {
        url: 'mapImageUrl',
        bounds: mockedBoundAndCenter.bounds,
        opacity: 1,
        zIndex: 10,
      },
      {}
    );
    expect(mockedGetMapBoundsAndCenter).toHaveBeenCalledWith({ yRange: 1 });
  });

  describe('when mapImageRatio passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <MapOnImage
          onClick={mockeOnClick}
          mapImageUrl="mapImageUrl"
          backgroundColor="backgroundColor"
          mapImageRatio={2}
        >
          Children
        </MapOnImage>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MapEventsHandler).toHaveBeenCalledWith(
        {
          handleMapClick: mockeOnClick,
        },
        {}
      );
      expect(MockedImageOverlay).toHaveBeenCalledWith(
        {
          url: 'mapImageUrl',
          bounds: mockedBoundAndCenter.bounds,
          opacity: 1,
          zIndex: 10,
        },
        {}
      );
      expect(mockedGetMapBoundsAndCenter).toHaveBeenCalledWith({ yRange: 0.5 });
    });
  });
});
