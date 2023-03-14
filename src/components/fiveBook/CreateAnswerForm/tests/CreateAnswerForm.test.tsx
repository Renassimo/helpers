import renderWithTheme from '@/tests/helpers';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getTurboModeAnswers from '@/utils/fiveBook/getTurboModeAnswers';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';

import CreateAnswerForm from '@/components/fiveBook/CreateAnswerForm';

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@/hooks/fiveBook/useUpdateAnswers');
jest.mock('@/utils/fiveBook/getTurboModeAnswers');
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('CreateAnswerForm', () => {
  const mockedYearOptions = ['2019', '2021', '2023'];
  const mockedNextFiveBookDayCode = '314';
  const mockedCurrentYear = '2023';
  const mockedUpdate = jest.fn();
  const answer = 'My answer is...';

  beforeEach(() => {
    const mockedUseFiveBook = jest.fn(() => ({
      yearOptions: mockedYearOptions,
      nextFiveBookDayCode: mockedNextFiveBookDayCode,
      currentYear: mockedCurrentYear,
    }));
    (useFiveBook as unknown as jest.Mock).mockImplementation(mockedUseFiveBook);

    const mockedUseUpdateAnswers = jest.fn(() => ({
      update: mockedUpdate,
      loading: false,
    }));
    (useUpdateAnswers as unknown as jest.Mock).mockImplementation(
      mockedUseUpdateAnswers
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates answer', async () => {
    // Arrange
    const { getByLabelText, getByText } = renderWithTheme(<CreateAnswerForm />);
    // Act
    await waitFor(async () => {
      await userEvent.type(getByLabelText('Answer'), answer);
      await userEvent.click(getByText('Save'));
    });
    // Assert
    expect(mockedUpdate).toHaveBeenCalledWith({ [mockedCurrentYear]: answer });
  });

  describe('when turbo mode enabled', () => {
    const mockedGetTurboModeAnswersResult = 'getTurboModeAnswers result';
    const mockedGetTurboModeAnswers = jest.fn(
      () => mockedGetTurboModeAnswersResult
    );
    beforeEach(() => {
      (getTurboModeAnswers as unknown as jest.Mock).mockImplementationOnce(
        mockedGetTurboModeAnswers
      );
    });

    test('renders successfully', async () => {
      // Arrange
      const { getByLabelText, getByText } = renderWithTheme(
        <CreateAnswerForm />
      );
      // Act
      await waitFor(async () => {
        await userEvent.click(getByLabelText('Turbo mode'));
        await userEvent.type(getByLabelText('Answer'), answer);
        await userEvent.click(getByText('Save'));
      });
      // Assert
      expect(mockedUpdate).toHaveBeenCalledWith(
        mockedGetTurboModeAnswersResult
      );
      expect(mockedGetTurboModeAnswers).toHaveBeenCalledWith(
        answer,
        mockedYearOptions,
        mockedCurrentYear
      );
    });
  });

  describe('when chose year', () => {
    test('creates answer', async () => {
      // Arrange
      const year = '2019';
      const { getByLabelText, getByText } = renderWithTheme(
        <CreateAnswerForm />
      );
      // Act
      await waitFor(async () => {
        await userEvent.click(getByLabelText('Year'));
        await userEvent.click(getByText(year));
        await userEvent.type(getByLabelText('Answer'), answer);
        await userEvent.click(getByText('Save'));
      });
      // Assert
      expect(mockedUpdate).toHaveBeenCalledWith({ [year]: answer });
    });

    describe('when turbo mode enabled', () => {
      const mockedGetTurboModeAnswersResult = 'getTurboModeAnswers result';
      const mockedGetTurboModeAnswers = jest.fn(
        () => mockedGetTurboModeAnswersResult
      );
      beforeEach(() => {
        (getTurboModeAnswers as unknown as jest.Mock).mockImplementationOnce(
          mockedGetTurboModeAnswers
        );
      });

      test('renders successfully', async () => {
        // Arrange
        const year = '2019';
        const { getByLabelText, getByText } = renderWithTheme(
          <CreateAnswerForm />
        );
        // Act
        await waitFor(async () => {
          await userEvent.click(getByLabelText('Year'));
          await userEvent.click(getByText(year));
          await userEvent.click(getByLabelText('Turbo mode'));
          await userEvent.type(getByLabelText('Answer'), answer);
          await userEvent.click(getByText('Save'));
        });
        // Assert
        expect(mockedUpdate).toHaveBeenCalledWith(
          mockedGetTurboModeAnswersResult
        );
        expect(mockedGetTurboModeAnswers).toHaveBeenCalledWith(
          answer,
          mockedYearOptions,
          year
        );
      });
    });
  });
});
