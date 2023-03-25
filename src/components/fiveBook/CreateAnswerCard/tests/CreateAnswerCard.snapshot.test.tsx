import renderWithTheme from '@/tests/helpers';

import useMediaQuery from '@mui/material/useMediaQuery';

import DatePicker from '@/components/fiveBook/DatePicker';
import CreateAnswerForm from '@/components/fiveBook/CreateAnswerForm';

import MockedDatePicker from '@/components/fiveBook/DatePicker/mocks';
import MockedCreateAnswerForm from '@/components/fiveBook/CreateAnswerForm/mocks';

import CreateAnswerCard from '../CreateAnswerCard';
import useFiveBook from '@/hooks/fiveBook/useFiveBook';

jest.mock('@/hooks/fiveBook/useFiveBook');
jest.mock('@mui/material/useMediaQuery');
jest.mock('@/components/fiveBook/DatePicker');
jest.mock('@/components/fiveBook/CreateAnswerForm');

describe('CreateAnswerCard snapshot', () => {
  let mockedIsLowerThanMd = true;
  const emoji = '🛤️';
  const mockedUseMediaQuery = jest.fn(() => mockedIsLowerThanMd);

  beforeEach(() => {
    (useMediaQuery as unknown as jest.Mock).mockImplementation(
      mockedUseMediaQuery
    );
    (DatePicker as unknown as jest.Mock).mockImplementation(MockedDatePicker);
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
      expect(MockedDatePicker).not.toHaveBeenCalled();
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
        expect(MockedDatePicker).not.toHaveBeenCalled();
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
      expect(MockedDatePicker).toHaveBeenCalledWith({ staticPicker: true }, {});
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
        expect(MockedDatePicker).toHaveBeenCalledWith(
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
