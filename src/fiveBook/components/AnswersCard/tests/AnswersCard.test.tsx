import renderWithTheme from '@/common/tests/helpers';

import UpdateAnswer from '@/fiveBook/components/UpdateAnswer';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

import MockedUpdateAnswer from '@/fiveBook/components/UpdateAnswer/mocks';
import userEvent from '@testing-library/user-event';

const mockedReplace = jest.fn();

import AnswersCard from '../AnswersCard';

jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('@/fiveBook/components/UpdateAnswer');
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockedReplace,
    query: { updateYear: '' },
  }),
}));

describe('AnswersCard', () => {
  const mockedQuestion = 'wSup?';
  const mockedAnswers = [
    {
      year: '2022',
      value: 'Good!',
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

  describe('When clicked to year', () => {
    test('changes page url to open modal', async () => {
      // Arrange
      const { getByText } = renderWithTheme(<AnswersCard />);
      // Act
      await userEvent.click(getByText('2022'));
      // Assert
      expect(mockedReplace).toHaveBeenCalledWith(
        { pathname: '', query: { updateYear: '2022' } },
        undefined,
        { shallow: true }
      );
    });
  });
});
