import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import Modal from '@/common/components/Modal';
import SearchMyFlightDetailsForm from '@/myFlights/components/SearchMyFlightDetailsForm';
import MyFlightForm from '@/myFlights/components/MyFlightForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedSearchMyFlightDetailsForm from '@/myFlights/components/SearchMyFlightDetailsForm/mocks';
import MockedMyFlightForm from '@/myFlights/components/MyFlightForm/mocks';

import MyFlightFormModal from '../MyFlightFormModal';

jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/common/components/Modal');
jest.mock('@/myFlights/components/SearchMyFlightDetailsForm');
jest.mock('@/myFlights/components/MyFlightForm');

describe('MyFlightFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (SearchMyFlightDetailsForm as unknown as jest.Mock).mockImplementation(
      MockedSearchMyFlightDetailsForm
    );
    (MyFlightForm as unknown as jest.Mock).mockImplementation(
      MockedMyFlightForm
    );
  });

  test('renders snapshot successfully', () => {
    // Arange
    const mockedUseMyFlightsContext = jest.fn(() => ({
      myFlightForm: {
        isModalOpen: true,
        closeModal: jest.fn(),
        isEditing: false,
        onSubmit: jest.fn(),
        loading: false,
      },
    }));
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      mockedUseMyFlightsContext
    );
    // Act
    const { baseElement } = renderWithTheme(<MyFlightFormModal />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedSearchMyFlightDetailsForm).toHaveBeenCalledWith({}, {});
    expect(MockedMyFlightForm).toHaveBeenCalledWith({}, {});
  });
});
