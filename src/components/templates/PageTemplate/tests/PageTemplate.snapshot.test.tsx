import renderWithTheme from '@/tests/helpers';

import NavBar from '@/common/components/NavBar';
import StaticNavBar from '@/common/components/StaticNavBar';

import MockedNavBar from '@/common/components/NavBar/mocks';
import MockedStaticNavBar from '@/common/components/StaticNavBar/mocks';

import PageTemplate from '../PageTemplate';

jest.mock('@/common/components/NavBar');
jest.mock('@/common/components/StaticNavBar');

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
