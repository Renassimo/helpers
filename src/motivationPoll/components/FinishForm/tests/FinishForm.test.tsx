import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/tests/helpers';
import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import FinishForm from '../FinishForm';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');

describe('FinishForm', () => {
  const mockedName = 'Mocked description';
  const mockedSetName = jest.fn();
  const mockedPrepareResults = jest.fn();

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      name: mockedName,
      setName: mockedSetName,
      prepareResults: mockedPrepareResults,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Sets name and get result', async () => {
    // Arange
    const { getByText, getByTestId } = renderWithTheme(<FinishForm />);
    const nameInput = getByTestId('name-input');
    const submitButton = getByText('Get Results');
    await userEvent.type(nameInput, 'Ken');

    // Act
    await userEvent.click(submitButton);
    // Assert
    expect(mockedSetName).toHaveBeenCalledTimes(3);
    expect(mockedPrepareResults).toHaveBeenCalled();
  });
});
