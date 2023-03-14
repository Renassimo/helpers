import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';
import renderWithTheme from '@/tests/helpers';
import UpdateAnswer from '@/components/fiveBook/UpdateAnswer';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

const mockedUpdateYear = '2022';
const mockedReplace = jest.fn();

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@/hooks/fiveBook/useUpdateAnswers');
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockedReplace,
    query: { updateYear: mockedUpdateYear },
  }),
}));

describe('UpdateAnswer', () => {
  const mockedQuestion = 'wSup?';
  const mockedAnswers = [
    {
      year: '2022',
      value: 'Good!',
    },
  ];
  const mockUpdate = jest.fn();

  beforeEach(() => {
    const mockUseFiveBook = {
      answers: mockedAnswers,
      question: mockedQuestion,
    };
    (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
    (useUpdateAnswers as jest.Mock).mockImplementation(() => ({
      update: mockUpdate,
      loading: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits updated answer', async () => {
    // Arrange
    const { getByText, getByLabelText } = renderWithTheme(<UpdateAnswer />);
    // Act
    await waitFor(async () => {
      await userEvent.type(getByLabelText('Update'), '!!');
      await userEvent.click(getByText('Save'));
    });
    // Assert
    expect(mockUpdate).toHaveBeenCalledWith({ 2022: 'Good!!!' });
    expect(mockedReplace).toHaveBeenCalledWith(
      { pathname: '', query: {} },
      undefined,
      { shallow: true }
    );
  });

  describe('when click to close', () => {
    test('closes modal window', async () => {
      // Arrange
      const { getByLabelText } = renderWithTheme(<UpdateAnswer />);
      // Act
      await userEvent.click(getByLabelText('close'));
      // Assert
      expect(mockUpdate).not.toHaveBeenCalled();
      expect(mockedReplace).toHaveBeenCalledWith(
        { pathname: '', query: {} },
        undefined,
        { shallow: true }
      );
    });
  });
});