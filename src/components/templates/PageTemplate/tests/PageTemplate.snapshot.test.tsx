import renderWithTheme from '@/tests/helpers';

import NavBar from '@/components/common/NavBar';

import MockedNavBar from '@/components/common/NavBar/mocks';

import PageTemplate from '../PageTemplate';

jest.mock('@/components/common/NavBar');

describe('PageTemplate', () => {
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

  test('renders successfully', () => {
    // Arrange

    (NavBar as unknown as jest.Mock).mockImplementationOnce(MockedNavBar);
    // Act
    const { container } = renderWithTheme(
      <PageTemplate title={title} user={user} pages={pages}>
        Children
      </PageTemplate>
    );
    // Assert
    expect(container).toMatchSnapshot();
    expect(MockedNavBar).toHaveBeenCalledWith(
      {
        pages,
        serverSideUser: user,
      },
      {}
    );
  });

  describe('when navBarChildren passed', () => {
    test('renders successfully', () => {
      // Arrange
      const navBarChildren = <div>Nav bar children</div>;
      (NavBar as unknown as jest.Mock).mockImplementationOnce(MockedNavBar);
      // Act
      const { container } = renderWithTheme(
        <PageTemplate
          title={title}
          user={user}
          pages={pages}
          navBarChildren={navBarChildren}
        >
          Children
        </PageTemplate>
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedNavBar).toHaveBeenCalledWith(
        {
          children: navBarChildren,
          pages,
          serverSideUser: user,
        },
        {}
      );
    });
  });
});
