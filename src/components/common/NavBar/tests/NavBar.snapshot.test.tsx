import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useAuth from '@/hooks/useAuth';

import NavBar from '@/components/common/NavBar';
import renderWithTheme from '@/tests/helpers';

jest.mock('@/hooks/useAuth');

describe('NavBar', () => {
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
  const mockedSignOut = jest.fn();
  const mockedUseAuth = jest.fn(() => ({
    user,
    signOut: mockedSignOut,
  }));

  beforeEach(() => {
    (useAuth as unknown as jest.Mock).mockImplementation(mockedUseAuth);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { baseElement } = renderWithTheme(
      <NavBar serverSideUser={user} pages={pages} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('When children passed', () => {
    test('renders successfully', async () => {
      // Arrange
      // Act
      const { baseElement } = renderWithTheme(
        <NavBar serverSideUser={user} pages={pages}>
          <div>Children</div>
        </NavBar>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('When menu is open', () => {
    test('renders successfully', async () => {
      // Arrange
      const { baseElement, getByAltText } = renderWithTheme(
        <NavBar serverSideUser={user} pages={pages} />
      );
      // Act
      await userEvent.click(getByAltText('Name'));
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('When closes menu', () => {
    describe('by clicking avatar', () => {
      test('renders successfully', async () => {
        // Arrange
        const { baseElement, getByAltText } = renderWithTheme(
          <NavBar serverSideUser={user} pages={pages} />
        );
        await waitFor(() => {
          userEvent.click(getByAltText('Name'));
        });
        // Act
        await waitFor(() => {
          userEvent.click(getByAltText('Name'));
        });
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('by clicking outside', () => {
      test('renders successfully', async () => {
        // Arrange
        const { baseElement, getByAltText } = renderWithTheme(
          <NavBar serverSideUser={user} pages={pages} />
        );
        await waitFor(() => {
          userEvent.click(getByAltText('Name'));
        });
        // Act
        await waitFor(() => {
          userEvent.click(document.body);
        });
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('When sign out', () => {
    test('renders successfully', async () => {
      // Arrange
      const { baseElement, getByAltText, getByText } = renderWithTheme(
        <NavBar serverSideUser={user} pages={pages} />
      );
      await waitFor(() => {
        userEvent.click(getByAltText('Name'));
      });
      // Act
      await waitFor(() => {
        userEvent.click(getByText('Sign Out'));
      });
      // Assert
      await waitFor(() => {
        expect(baseElement).toMatchSnapshot();
        expect(mockedSignOut).toHaveBeenCalled();
      });
    });
  });
});
