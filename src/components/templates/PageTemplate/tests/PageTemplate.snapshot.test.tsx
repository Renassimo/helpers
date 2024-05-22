import renderWithTheme from '@/tests/helpers';

import NavBar from '@/components/common/NavBar';
import StaticNavBar from '@/components/common/StaticNavBar';

import MockedNavBar from '@/components/common/NavBar/mocks';
import MockedStaticNavBar from '@/components/common/StaticNavBar/mocks';

import PageTemplate from '../PageTemplate';

jest.mock('@/components/common/NavBar');
jest.mock('@/components/common/StaticNavBar');

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

  test('renders successfully with NavBar', () => {
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

  describe('when user is not passed', () => {
    test('renders successfully with StaticNavBar ', () => {
      // Arange
      (StaticNavBar as unknown as jest.Mock).mockImplementationOnce(
        MockedStaticNavBar
      );
      // Act
      const { container } = renderWithTheme(
        <PageTemplate title={title} pages={pages}>
          Children
        </PageTemplate>
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedStaticNavBar).toHaveBeenCalledWith(
        {
          pages,
        },
        {}
      );
    });
  });

  describe('when navBarChildren passed', () => {
    const navBarChildren = <div>Nav bar children</div>;
    test('renders successfully with NavBar', () => {
      // Arrange
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

    describe('when user is not passed', () => {
      test('renders successfully with StaticNavBar ', () => {
        // Arange
        (StaticNavBar as unknown as jest.Mock).mockImplementationOnce(
          MockedStaticNavBar
        );
        // Act
        const { container } = renderWithTheme(
          <PageTemplate
            title={title}
            pages={pages}
            navBarChildren={navBarChildren}
          >
            Children
          </PageTemplate>
        );
        // Assert
        expect(container).toMatchSnapshot();
        expect(MockedStaticNavBar).toHaveBeenCalledWith(
          {
            children: navBarChildren,
            pages,
          },
          {}
        );
      });
    });
  });
});
