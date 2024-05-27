import { render } from '@testing-library/react';

import { PageInfo } from '@/common/types/auth';

import PageTemplate from '@/common/templates/PageTemplate';
import PagesList from '@/common/components/PagesList';

import MainPage from '../MainPage';

import MockedPagesList from '@/common/components/PagesList/mocks';
import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';

jest.mock('@/common/templates/PageTemplate');
jest.mock('@/common/components/PagesList');

describe('MainPage', () => {
  const user = {
    email: 'email@example.com',
    name: 'Name',
    picture: 'https://pic.com',
    uid: 'uid',
  };

  beforeEach(() => {
    (PageTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedPageTemplate
    );
    (PagesList as unknown as jest.Mock).mockImplementationOnce(MockedPagesList);
  });

  test('renders successfully', () => {
    // Arrange
    const pages = [
      {
        title: 'Page 1',
        path: 'path1',
      },
      {
        title: 'Page 2',
        path: 'path2',
      },
    ];
    // Act
    const { container } = render(<MainPage user={user} pages={pages} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(MockedPageTemplate).toHaveBeenCalled();
  });

  describe('when got no pages', () => {
    test('renders successfully', () => {
      // Arrange
      const pages: PageInfo[] = [];
      // Act
      const { container } = render(<MainPage user={user} pages={pages} />);
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedPageTemplate).toHaveBeenCalled();
    });
  });
});
