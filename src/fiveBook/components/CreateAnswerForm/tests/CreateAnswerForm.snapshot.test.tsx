import renderWithTheme from '@/tests/helpers';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';

import CreateAnswerForm from '../CreateAnswerForm';

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@/hooks/fiveBook/useUpdateAnswers');
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('CreateAnswerForm snapshot', () => {
  const mockedYearOptions = ['2019', '2021', '2023'];
  const mockedNextFiveBookDayCode = '314';
  const mockedCurrentYear = '2023';
  const mockedUpdate = jest.fn();
  let mockedLoading = false;

  beforeEach(() => {
    const mockedUseFiveBook = jest.fn(() => ({
      yearOptions: mockedYearOptions,
      nextFiveBookDayCode: mockedNextFiveBookDayCode,
      currentYear: mockedCurrentYear,
    }));
    (useFiveBook as unknown as jest.Mock).mockImplementation(mockedUseFiveBook);

    const mockedUseUpdateAnswers = jest.fn(() => ({
      update: mockedUpdate,
      loading: mockedLoading,
    }));
    (useUpdateAnswers as unknown as jest.Mock).mockImplementation(
      mockedUseUpdateAnswers
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { baseElement } = renderWithTheme(<CreateAnswerForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when loading', () => {
    test('renders successfully', () => {
      // Arrange
      mockedLoading = true;
      // Act
      const { baseElement } = renderWithTheme(<CreateAnswerForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
