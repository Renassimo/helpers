import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import Modal from '@/common/components/Modal';
import MyFlightForm from '@/myFlights/components/MyFlightForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedMyFlightForm from '@/myFlights/components/MyFlightForm/mocks';

import MyFlightFormModal from '../MyFlightFormModal';

jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/common/components/Modal');
jest.mock('@/myFlights/components/MyFlightForm');

describe('MyFlightFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (MyFlightForm as unknown as jest.Mock).mockImplementation(
      MockedMyFlightForm
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
    expect(MockedMyFlightForm).toHaveBeenCalledWith({}, {});
  });
});
