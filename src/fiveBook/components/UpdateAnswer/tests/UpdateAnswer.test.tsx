import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/tests/helpers';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';
import useAlerts from '@/hooks/alerts';

import UpdateAnswer from '../UpdateAnswer';

const mockedUpdateYear = '2022';
const mockedReplace = jest.fn();

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@/hooks/fiveBook/useUpdateAnswers');
jest.mock('@/hooks/alerts');
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
  const mockCreateErrorAlert = jest.fn();

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
    (useAlerts as jest.Mock).mockImplementation(() => ({
      createErrorAlert: mockCreateErrorAlert,
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
    expect(mockCreateErrorAlert).not.toHaveBeenCalled();
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
      expect(mockCreateErrorAlert).not.toHaveBeenCalled();
      expect(mockedReplace).toHaveBeenCalledWith(
        { pathname: '', query: {} },
        undefined,
        { shallow: true }
      );
    });
  });

  describe('when throws error on update', () => {
    const errorMessage = 'Oops...';

    beforeEach(() => {
      (useUpdateAnswers as jest.Mock).mockImplementation(() => ({
        update: () => {
          throw new Error(errorMessage);
        },
        loading: false,
      }));
    });

    test('creates an alert', async () => {
      // Arrange
      const { getByText, getByLabelText } = renderWithTheme(<UpdateAnswer />);
      // Act
      await waitFor(async () => {
        await userEvent.type(getByLabelText('Update'), '!!');
        await userEvent.click(getByText('Save'));
      });
      // Assert
      expect(mockUpdate).not.toHaveBeenCalled();
      expect(mockedReplace).not.toHaveBeenCalled();
      expect(mockCreateErrorAlert).toHaveBeenCalledWith(errorMessage);
    });
  });
});
