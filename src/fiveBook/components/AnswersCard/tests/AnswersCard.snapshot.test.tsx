import renderWithTheme from '@/tests/helpers';

import UpdateAnswer from '@/fiveBook/components/UpdateAnswer';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';

import MockedUpdateAnswer from '@/fiveBook/components/UpdateAnswer/mocks';

import AnswersCard from '../AnswersCard';

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@/fiveBook/components/UpdateAnswer');
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    query: { updateYear: '' },
  }),
}));

describe('AnswersCard snapshot', () => {
  const mockedQuestion = 'wSup?';
  const mockedAnswers = [
    {
      year: '2022',
      value: 'Good!',
    },
    {
      year: '2023',
      value: 'Nice!',
    },
  ];

  beforeEach(() => {
    const mockUseFiveBook = {
      answers: mockedAnswers,
      question: mockedQuestion,
    };
    (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
    (UpdateAnswer as jest.Mock).mockImplementation(MockedUpdateAnswer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { baseElement } = renderWithTheme(<AnswersCard />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedUpdateAnswer).toHaveBeenCalledWith({}, {});
  });
});
