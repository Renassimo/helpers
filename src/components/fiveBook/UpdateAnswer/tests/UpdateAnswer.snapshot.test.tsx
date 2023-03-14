import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';
import renderWithTheme from '@/tests/helpers';
import UpdateAnswer from '@/components/fiveBook/UpdateAnswer';

let mockedUpdateYear = '2022';

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@/hooks/fiveBook/useUpdateAnswers');
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    query: { updateYear: mockedUpdateYear },
  }),
}));

describe('UpdateAnswer snapshot', () => {
  const mockedQuestion = 'wSup?';
  const mockedAnswers = [
    {
      year: '2022',
      value: 'Good!',
    },
  ];
  let loading = false;

  beforeEach(() => {
    const mockUseFiveBook = {
      answers: mockedAnswers,
      question: mockedQuestion,
    };
    (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
    (useUpdateAnswers as jest.Mock).mockImplementation(() => ({
      update: jest.fn(),
      loading,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    const { baseElement } = renderWithTheme(<UpdateAnswer />);
    // Act
    expect(baseElement).toMatchSnapshot();
    // Assert
  });

  describe('when loading', () => {
    beforeEach(() => {
      loading = true;
    });

    test('renders successfully', () => {
      // Arrange
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Act
      expect(baseElement).toMatchSnapshot();
      // Assert
    });
  });

  describe('when no answers', () => {
    beforeEach(() => {
      const mockUseFiveBook = {
        answers: [],
        question: mockedQuestion,
      };
      (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
    });

    test('renders successfully', () => {
      // Arrange
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Act
      expect(baseElement).toMatchSnapshot();
      // Assert
    });
  });

  describe('when no updateYear', () => {
    beforeEach(() => {
      mockedUpdateYear = '';
    });

    test('renders successfully', () => {
      // Arrange
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Act
      expect(baseElement).toMatchSnapshot();
      // Assert
    });
  });

  describe('when updateYear is not in answers list', () => {
    beforeEach(() => {
      mockedUpdateYear = '2020';
    });

    test('renders successfully', () => {
      // Arrange
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Act
      expect(baseElement).toMatchSnapshot();
      // Assert
    });
  });
});
