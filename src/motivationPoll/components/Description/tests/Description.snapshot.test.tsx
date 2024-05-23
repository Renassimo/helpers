import renderWithTheme from '@/common/tests/helpers';
import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';
import Description from '../Description';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');

describe('Description snapshot', () => {
  const mockedDescription = 'Mocked description';

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      description: mockedDescription,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<Description />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
