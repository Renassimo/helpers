import renderWithTheme from '@/tests/helpers';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getTurboModeAnswers from '@/fiveBook/utils/getTurboModeAnswers';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';
import useUpdateAnswers from '@/fiveBook/hooks/useUpdateAnswers';
import useAlerts from '@/common/hooks/alerts';

import CreateAnswerForm from '../CreateAnswerForm';

jest.mock('@/common/hooks/alerts');
jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('@/fiveBook/hooks/useUpdateAnswers');
jest.mock('@/fiveBook/utils/getTurboModeAnswers');
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('CreateAnswerForm', () => {
  const mockedCreateErrorAlert = jest.fn();
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

    (useAlerts as unknown as jest.Mock).mockImplementation(() => ({
      createErrorAlert: mockedCreateErrorAlert,
    }));
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

    test('creates answers', async () => {
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

      test('creates answers', async () => {
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

  describe('when got error', () => {
    beforeEach(() => {
      const mockedUseUpdateAnswers = jest.fn(() => ({
        update: () => {
          throw new Error('new error');
        },
        loading: false,
      }));
      (useUpdateAnswers as unknown as jest.Mock).mockImplementation(
        mockedUseUpdateAnswers
      );
    });

    test('creates error alert', async () => {
      // Arrange
      const { getByLabelText, getByText } = renderWithTheme(
        <CreateAnswerForm />
      );
      // Act
      await waitFor(async () => {
        await userEvent.type(getByLabelText('Answer'), answer);
        await userEvent.click(getByText('Save'));
      });
      // Assert
      expect(mockedCreateErrorAlert).toHaveBeenCalledWith('new error');
      expect(mockedUpdate).not.toHaveBeenCalled();
    });
  });
});
