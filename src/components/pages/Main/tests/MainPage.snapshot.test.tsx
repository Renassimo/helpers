import { render } from '@testing-library/react';

import { PageInfo } from '@/types/auth';

import PageTemplate from '@/components/templates/PageTemplate';

import MockedPageTemplate from '@/components/templates/PageTemplate/mocks';

import MainPage from '../MainPage';

jest.mock('@/components/templates/PageTemplate');

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
  });

  describe('when got no pages', () => {
    test('renders successfully', () => {
      // Arrange
      const pages: PageInfo[] = [];
      // Act
      const { container } = render(<MainPage user={user} pages={pages} />);
      // Assert
      expect(container).toMatchSnapshot();
    });
  });
});
