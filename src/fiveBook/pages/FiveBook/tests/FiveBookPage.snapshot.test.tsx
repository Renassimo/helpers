import renderWithTheme from '@/common/tests/helpers';

import PageTemplate from '@/common/templates/PageTemplate';
import CreateAnswerCard from '@/fiveBook/components/CreateAnswerCard';
import AnswersCard from '@/fiveBook/components/AnswersCard';
import DayLink from '@/fiveBook/components/DayLink';

import useMediaQuery from '@mui/material/useMediaQuery';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import MockedCreateAnswerCard from '@/fiveBook/components/CreateAnswerCard/mocks';
import MockedAnswerCard from '@/fiveBook/components/AnswersCard/mocks';
import MockedDayLink from '@/fiveBook/components/DayLink/mocks';

import FiveBookPage from '../FiveBookPage';

import { NotionError } from '@/common/types/notion';

jest.mock('@/common/templates/PageTemplate');
jest.mock('@/fiveBook/components/CreateAnswerCard');
jest.mock('@/fiveBook/components/AnswersCard');
jest.mock('@/fiveBook/components/DayLink');
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
      dayCode: '203',
      question: 'wSup?',
      answers: {
        '2012': 'Fine!',
        '2018': 'Good!',
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
