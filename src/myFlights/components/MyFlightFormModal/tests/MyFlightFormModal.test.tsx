import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import Modal from '@/common/components/Modal';
import SearchMyFlightDetailsForm from '@/myFlights/components/SearchMyFlightDetailsForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedSearchMyFlightDetailsForm from '@/myFlights/components/SearchMyFlightDetailsForm/mocks';

import MyFlightFormModal from '../MyFlightFormModal';

jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/common/components/Modal');
jest.mock('@/myFlights/components/SearchMyFlightDetailsForm');

describe('MyFlightFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (SearchMyFlightDetailsForm as unknown as jest.Mock).mockImplementation(
      MockedSearchMyFlightDetailsForm
    );
  });

  const mockedCleanUp = jest.fn();
  const mockedSetIsModalOpen = jest.fn();
  const mockedOnFinish = jest.fn();

  test('renders snapshot successfully', () => {
    // Arange
    const mockedUseMyFlightsContext = jest.fn(() => ({
      cleanUp: mockedCleanUp,
    }));
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      mockedUseMyFlightsContext
    );
    // Act
    const { baseElement } = renderWithTheme(
      <MyFlightFormModal
        isModalOpen={true}
        setIsModalOpen={mockedSetIsModalOpen}
        onFinish={mockedOnFinish}
        data={null}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedSearchMyFlightDetailsForm).toHaveBeenCalledWith({}, {});
  });
});
