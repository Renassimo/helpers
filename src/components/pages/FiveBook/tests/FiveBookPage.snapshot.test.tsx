import renderWithTheme from '@/tests/helpers';

import PageTemplate from '@/components/templates/PageTemplate';
import CreateAnswerCard from '@/components/fiveBook/CreateAnswerCard';
import AnswersCard from '@/components/fiveBook/AnswersCard';
import DayLink from '@/components/fiveBook/DayLink';

import useMediaQuery from '@mui/material/useMediaQuery';

import MockedPageTemplate from '@/components/templates/PageTemplate/mocks';
import MockedCreateAnswerCard from '@/components/fiveBook/CreateAnswerCard/mocks';
import MockedAnswerCard from '@/components/fiveBook/AnswersCard/mocks';
import MockedDayLink from '@/components/fiveBook/DayLink/mocks';

import FiveBookPage from '../FiveBookPage';

import { NotionError } from '@/types/notion';

jest.mock('@/components/templates/PageTemplate');
jest.mock('@/components/fiveBook/CreateAnswerCard');
jest.mock('@/components/fiveBook/AnswersCard');
jest.mock('@/components/fiveBook/DayLink');
jest.mock('@mui/material/useMediaQuery');

describe('FiveBookPage', () => {
  const user = {
    email: 'email@example.com',
    name: 'Name',
    picture: 'https://pic.com',
    uid: 'uid',
  };
  const pages = [
    {
      title: 'title',
      path: 'path',
    },
  ];
  const data = {
    id: 'id',
    attributes: {
      dayCode: {
        id: 'day-code-id',
        value: '203',
      },
      question: {
        id: 'question-id',
        value: 'wSup?',
      },
      answers: {
        '2012': {
          id: 'answer-2012-id',
          value: 'Fine!',
        },
        '2018': {
          id: 'answer-2018-id',
          value: 'Good!',
        },
      },
    },
  };
  const error: NotionError = {
    code: 'i_am_teapot',
    message: 'I am Teapot',
    object: 'error',
    status: 418,
  };

  beforeEach(() => {
    (PageTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedPageTemplate
    );
  });

  describe('when got data', () => {
    beforeEach(() => {
      (CreateAnswerCard as unknown as jest.Mock).mockImplementationOnce(
        MockedCreateAnswerCard
      );
      (AnswersCard as unknown as jest.Mock).mockImplementationOnce(
        MockedAnswerCard
      );
      (DayLink as unknown as jest.Mock).mockImplementationOnce(MockedDayLink);
    });

    describe('and screen width is wider than "md"', () => {
      const mockUseMediaQuery = jest.fn(() => true);

      beforeEach(() => {
        (useMediaQuery as unknown as jest.Mock).mockImplementationOnce(
          mockUseMediaQuery
        );
      });

      test('renders successfully', () => {
        // Arrange
        // Act
        const { container } = renderWithTheme(
          <FiveBookPage user={user} pages={pages} data={data} error={null} />
        );
        // Assert
        expect(container).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
        expect(MockedCreateAnswerCard).toHaveBeenCalledWith({}, {});
        expect(MockedAnswerCard).toHaveBeenCalledWith({}, {});
        expect(MockedDayLink).toHaveBeenCalledWith({ prev: true }, {});
        expect(MockedPageTemplate).toHaveBeenCalled();
      });
    });

    describe('and screen width is lower than "md"', () => {
      const mockUseMediaQuery = jest.fn(() => false);

      beforeEach(() => {
        (useMediaQuery as unknown as jest.Mock).mockImplementationOnce(
          mockUseMediaQuery
        );
      });

      test('renders successfully', () => {
        // Arrange
        // Act
        const { container } = renderWithTheme(
          <FiveBookPage user={user} pages={pages} data={data} error={null} />
        );
        // Assert
        expect(container).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
        expect(MockedCreateAnswerCard).toHaveBeenCalledWith({}, {});
        expect(MockedAnswerCard).toHaveBeenCalledWith({}, {});
        expect(MockedDayLink).toHaveBeenCalledWith({ prev: true }, {});
        expect(MockedPageTemplate).toHaveBeenCalled();
      });
    });
  });

  describe('when got error', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { container } = renderWithTheme(
        <FiveBookPage user={user} pages={pages} data={null} error={error} />
      );
      // Assert
      expect(container).toMatchSnapshot();
    });
  });
});
