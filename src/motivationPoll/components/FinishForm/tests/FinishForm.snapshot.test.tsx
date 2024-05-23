import renderWithTheme from '@/common/tests/helpers';
import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import FinishForm from '../FinishForm';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');

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
