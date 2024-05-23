import renderWithTheme from '@/tests/helpers';
import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';
import Description from '../Description';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');

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
