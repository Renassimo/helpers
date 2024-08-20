import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import MapMarker from '../MapMarker';
import getMarkerIcon from '../../../utils/getMarkerIcon';

import { Marker, Popup, Tooltip } from 'react-leaflet';

jest.mock('react-leaflet');
jest.mock('../../../utils/getMarkerIcon');

describe('MapMarker snapshot', () => {
  const MokcedMarker = jest.fn(({ position, children, icon }) => (
    <div>
      MockedMarker - {position[0]} - {position[1]} - {icon} - {children}
    </div>
  ));
  const MockedPopup = jest.fn(({ children }) => (
    <div>MockedPopup - {children}</div>
  ));
  const MockedTooltip = jest.fn(({ direction, offset }) => (
    <div>
      MockedTooltip - {direction} - {offset[0]} - {offset[1]}
    </div>
  ));
  const mockedIcon = 'mocked-icon';
  const mockedGetMarkerIcon = jest.fn(() => mockedIcon);

  beforeEach(() => {
    (Marker as unknown as jest.Mock).mockImplementation(MokcedMarker);
    (Popup as unknown as jest.Mock).mockImplementation(MockedPopup);
    (Tooltip as unknown as jest.Mock).mockImplementation(MockedTooltip);
    (getMarkerIcon as unknown as jest.Mock).mockImplementation(
      mockedGetMarkerIcon
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    const mockedColor = '#aaaaaa';
    const mockedPosition = [0.1, 10.1] as [number, number];
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <MapMarker
        color={mockedColor}
        position={mockedPosition}
        title="mocked-title"
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(mockedGetMarkerIcon).toHaveBeenCalledWith(mockedColor, false, false);
  });

  describe('when children passed', () => {
    test('renders successfully', () => {
      const mockedColor = '#aaaaaa';
      const mockedPosition = [0.1, 10.1] as [number, number];
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <MapMarker color={mockedColor} position={mockedPosition} isNew isMarked>
          Popup Content
        </MapMarker>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedGetMarkerIcon).toHaveBeenCalledWith(mockedColor, true, true);
    });
  });
});
