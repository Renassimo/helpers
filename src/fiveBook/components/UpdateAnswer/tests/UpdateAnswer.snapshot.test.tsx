import renderWithTheme from '@/tests/helpers';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';
import useUpdateAnswers from '@/fiveBook/hooks/useUpdateAnswers';

import UpdateAnswer from '../UpdateAnswer';

let mockedUpdateYear = '2022';

jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('@/fiveBook/hooks/useUpdateAnswers');
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
    // Act
    const { baseElement } = renderWithTheme(<UpdateAnswer />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when loading', () => {
    beforeEach(() => {
      loading = true;
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Assert
      expect(baseElement).toMatchSnapshot();
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
      // Act
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when no updateYear', () => {
    beforeEach(() => {
      mockedUpdateYear = '';
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when updateYear is not in answers list', () => {
    beforeEach(() => {
      mockedUpdateYear = '2020';
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(<UpdateAnswer />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
