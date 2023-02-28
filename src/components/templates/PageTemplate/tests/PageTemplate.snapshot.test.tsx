import { render } from '@testing-library/react';

import NavBar from '@/components/common/NavBar';

import MockedNavBar from '@/components/common/NavBar/mocks';

import PageTemplate from '../PageTemplate';

jest.mock('@/components/common/NavBar');

describe('PageTemplate', () => {
  test('renders successfully', () => {
    // Arrange
    const title = 'Page';
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

    (NavBar as unknown as jest.Mock).mockImplementationOnce(MockedNavBar);
    // Act
    const { container } = render(
      <PageTemplate title={title} user={user} pages={pages}>
        Children
      </PageTemplate>
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
