import renderWithTheme from '@/common/tests/helpers';

import useMediaQuery from '@mui/material/useMediaQuery';

import FiveBookDatePicker from '@/fiveBook/components/FiveBookDatePicker';
import CreateAnswerForm from '@/fiveBook/components/CreateAnswerForm';

import MockedFiveBookDatePicker from '@/fiveBook/components/FiveBookDatePicker/mocks';
import MockedCreateAnswerForm from '@/fiveBook/components/CreateAnswerForm/mocks';

import CreateAnswerCard from '../CreateAnswerCard';
import useFiveBook from '@/fiveBook/hooks/useFiveBook';

jest.mock('@/fiveBook/hooks/useFiveBook');
jest.mock('@mui/material/useMediaQuery');
jest.mock('@/fiveBook/components/FiveBookDatePicker');
jest.mock('@/fiveBook/components/CreateAnswerForm');

describe('CreateAnswerCard snapshot', () => {
  let mockedIsLowerThanMd = true;
  const emoji = '🛤️';
  const mockedUseMediaQuery = jest.fn(() => mockedIsLowerThanMd);

  beforeEach(() => {
    (useMediaQuery as unknown as jest.Mock).mockImplementation(
      mockedUseMediaQuery
    );
    (FiveBookDatePicker as unknown as jest.Mock).mockImplementation(
      MockedFiveBookDatePicker
    );
    (CreateAnswerForm as unknown as jest.Mock).mockImplementation(
      MockedCreateAnswerForm
    );
    const mockUseFiveBook = {
      fiveBookDayText: '25 March',
      emoji,
    };
    (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when screen width is lower than md', () => {
    beforeEach(() => {
      mockedIsLowerThanMd = true;
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(<CreateAnswerCard />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedFiveBookDatePicker).not.toHaveBeenCalled();
      expect(MockedCreateAnswerForm).toHaveBeenCalledWith({}, {});
      expect(mockedUseMediaQuery).toHaveBeenCalledWith(
        '@media (max-width:899.95px)'
      );
    });

    describe('when got no emoji', () => {
      beforeEach(() => {
        const mockUseFiveBook = {
          fiveBookDayText: '25 March',
          emoji: undefined,
        };
        (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
      });

      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(<CreateAnswerCard />);
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(MockedFiveBookDatePicker).not.toHaveBeenCalled();
        expect(MockedCreateAnswerForm).toHaveBeenCalledWith({}, {});
        expect(mockedUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });
  });

  describe('when screen width is wider than md', () => {
    beforeEach(() => {
      mockedIsLowerThanMd = false;
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(<CreateAnswerCard />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedFiveBookDatePicker).toHaveBeenCalledWith(
        { staticPicker: true },
        {}
      );
      expect(MockedCreateAnswerForm).toHaveBeenCalledWith({}, {});
      expect(mockedUseMediaQuery).toHaveBeenCalledWith(
        '@media (max-width:899.95px)'
      );
    });

    describe('when got no emoji', () => {
      beforeEach(() => {
        const mockUseFiveBook = {
          fiveBookDayText: '25 March',
          emoji: undefined,
        };
        (useFiveBook as jest.Mock).mockImplementation(() => mockUseFiveBook);
      });

      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(<CreateAnswerCard />);
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(MockedFiveBookDatePicker).toHaveBeenCalledWith(
          { staticPicker: true },
          {}
        );
        expect(MockedCreateAnswerForm).toHaveBeenCalledWith({}, {});
        expect(mockedUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });
  });
});
