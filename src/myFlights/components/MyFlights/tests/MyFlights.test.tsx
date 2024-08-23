import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import FlightsTable from '@/myFlights/components/FlightsTable';

import MockedFlightsTable from '@/myFlights/components/FlightsTable/mocks';

import MyFlights from '../MyFlights';

jest.mock('@/myFlights/components/FlightsTable');

describe('MyFlights', () => {
  beforeEach(() => {
    (FlightsTable as unknown as jest.Mock).mockImplementation(
      MockedFlightsTable
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
});
