import { useContext } from 'react';
import useAuth from '@/hooks/useAuth';

jest.mock('react');
jest.mock('@/contexts/auth');

describe('useAuth', () => {
  const signIn = () => jest.fn();
  const signOut = () => jest.fn();

  const email = 'email@example.com';
  const name = 'Name';
  const picture = 'http://pic.jpeg';
  const uid = 'Zwyz123';

  const mockUser = {
    email,
    name,
    picture,
    uid,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when client side user is null', () => {
    const mockUseContext = jest.fn(() => ({
      user: null,
      signIn,
      signOut,
    }));
    (useContext as unknown as jest.Mock).mockImplementationOnce(mockUseContext);

    test('returns server side user', () => {
      // Arrange
      const expectedAuth = {
        user: mockUser,
        signIn,
        signOut,
      };
      // Act
      const auth = useAuth(mockUser);
      // Assert
      expect(auth).toEqual(expectedAuth);
    });
  });

  describe('when client side user exist', () => {
    const mockUseContext = jest.fn(() => ({
      user: mockUser,
      signIn,
      signOut,
    }));
    (useContext as unknown as jest.Mock).mockImplementationOnce(mockUseContext);

    test('returns client side user', () => {
      // Arrange
      const expectedAuth = {
        user: mockUser,
        signIn,
        signOut,
      };
      // Act
      const auth = useAuth(mockUser);
      // Assert
      expect(auth).toEqual(expectedAuth);
    });
  });

  describe('when user does not exist', () => {
    const mockUseContext = jest.fn(() => ({
      user: null,
      signIn,
      signOut,
    }));
    (useContext as unknown as jest.Mock).mockImplementationOnce(mockUseContext);

    test('returns no user', () => {
      // Arrange
      const expectedAuth = {
        user: null,
        signIn,
        signOut,
      };
      // Act
      const auth = useAuth(null);
      // Assert
      expect(auth).toEqual(expectedAuth);
    });
  });
});
