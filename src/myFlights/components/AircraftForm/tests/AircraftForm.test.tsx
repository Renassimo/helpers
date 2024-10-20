import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import BaseAircraftForm from '@/avia/components/BaseAircraftForm';
import MockedBaseAircraftForm from '@/avia/components/BaseAircraftForm/mocks';

import AircraftForm from '../AircraftForm';

jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/avia/components/BaseAircraftForm');

describe('AircraftForm', () => {
  beforeEach(() => {
    (BaseAircraftForm as unknown as jest.Mock).mockImplementation(
      MockedBaseAircraftForm
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ aircraftsResult: 'aircraftsResult' }))
    );
    // Act
    const { baseElement } = renderWithTheme(
      <AircraftForm registration="Registration" />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(BaseAircraftForm).toBeCalledWith(
      { aircraftsResult: 'aircraftsResult', registration: 'Registration' },
      {}
    );
  });
});
