import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';

import {
  mockedFlight,
  mockedFlight2,
  mockedFlight3,
} from '@/myFlights/types/mocks';

import FlightCardActions from '../FlightCardActions';

jest.mock('@/common/hooks/useThemeBreakpoints');

describe('FlightCardActions', () => {
  const mockedBreakpoints = {
    down: { md: false },
  };
  const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);

  beforeEach(() => {
    (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
      mockedUseThemeBreakpoints
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <FlightCardActions data={mockedFlight} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when limited data passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <FlightCardActions data={mockedFlight3} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when half data without planespottersUrl and with registration passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <FlightCardActions data={mockedFlight2} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when screen is lower than md', () => {
    test('renders successfully', () => {
      // Arange
      const mockedBreakpoints = {
        down: { md: true },
      };
      const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);
      (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
        mockedUseThemeBreakpoints
      );
      // Act
      const { baseElement } = renderWithTheme(
        <FlightCardActions data={mockedFlight} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe.skip('when clicks to edit button', () => {
    test('calls ...', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <FlightCardActions data={mockedFlight} />
      );
      // Act
      await userEvent.click(getByLabelText('Edit'));
      // Assert
    });
  });
});
