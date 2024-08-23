import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';
import { showWhen } from '@/common/utils/dayjs';

import FlightCardActions from '@/myFlights/components/FlightCardActions';

import MockedFlightCardActions from '@/myFlights/components/FlightCardActions/mocks';
import { mockedFlight, mockedFlight3 } from '@/myFlights/types/mocks';

import FlightCard from '../FlightCard';

jest.mock('@/common/hooks/useThemeBreakpoints');
jest.mock('@/common/utils/dayjs');
jest.mock('@/myFlights/components/FlightCardActions');

describe('FlightCard', () => {
  const mockedBreakpoints = {
    down: { sm: false },
  };
  const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);

  const mockedShowWhen = jest.fn((arg) => arg);

  beforeEach(() => {
    (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
      mockedUseThemeBreakpoints
    );
    (showWhen as unknown as jest.Mock).mockImplementation(mockedShowWhen);
    (FlightCardActions as unknown as jest.Mock).mockImplementation(
      MockedFlightCardActions
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<FlightCard data={mockedFlight} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedFlightCardActions).toBeCalledWith({ data: mockedFlight }, {});
  });

  describe('when limited data passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <FlightCard data={mockedFlight3} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedFlightCardActions).toBeCalledWith(
        { data: mockedFlight3 },
        {}
      );
    });
  });

  describe('when screen is lower than sm breakpoint', () => {
    test('renders successfully', () => {
      // Arange
      const mockedBreakpoints = {
        down: { sm: true },
      };
      const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);
      (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
        mockedUseThemeBreakpoints
      );
      // Act
      const { baseElement } = renderWithTheme(
        <FlightCard data={mockedFlight} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedFlightCardActions).toBeCalledWith(
        { data: mockedFlight },
        {}
      );
    });
  });
});
