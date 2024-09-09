import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import FlightsTable from '@/myFlights/components/MyFlightsTable';
import MyFlightFormModal from '@/myFlights/components/MyFlightFormModal';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import MockedMyFlightsTable from '@/myFlights/components/MyFlightsTable/mocks';
import MockedMyFlightFormModal from '@/myFlights/components/MyFlightFormModal/mocks';

import MyFlights from '../MyFlights';

jest.mock('@/myFlights/components/MyFlightsTable');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/myFlights/components/MyFlightFormModal');

describe('MyFlights', () => {
  beforeEach(() => {
    (FlightsTable as unknown as jest.Mock).mockImplementation(
      MockedMyFlightsTable
    );
    (MyFlightFormModal as unknown as jest.Mock).mockImplementation(
      MockedMyFlightFormModal
    );
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ options: null }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<MyFlights />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(FlightsTable).toBeCalledWith({}, {});
  });

  describe('when no option received', () => {
    beforeEach(() => {
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ options: 'mocked-options' }))
      );
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<MyFlights />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(FlightsTable).toBeCalledWith({}, {});
    });
  });
});
