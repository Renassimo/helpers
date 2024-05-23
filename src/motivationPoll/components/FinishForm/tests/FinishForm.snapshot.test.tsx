import renderWithTheme from '@/tests/helpers';
import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import FinishForm from '../FinishForm';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');

describe('FinishForm snapshot', () => {
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

  test('Renders successfully', async () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<FinishForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
