import { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';

import AuthProvider from '@/auth/providers';
import AuthContext from '@/auth/contexts/AuthContext';

import useUser from '../hooks/useUser';
import useSignIn from '../hooks/useSignIn';
import useSignOut from '../hooks/useSignOut';
import useRefreshToken from '../hooks/useRefreshToken';

const mockedSignInEvent = 'signIn';

jest.mock('../hooks/useRefreshToken');
jest.mock('../hooks/useSignIn');
jest.mock('../hooks/useSignOut');
jest.mock('../hooks/useUser');
jest.mock('@/common/lib/firebase/client', jest.fn());
jest.mock('@/common/lib/firebase/google', jest.fn());

const TestingComponent = () => {
  const { user, signIn, signOut } = useContext(AuthContext);

  useEffect(() => {
    signIn(mockedSignInEvent);
    signOut();
  });

  return (
    <>
      <p data-testid="name">{user?.name}</p>
      <p data-testid="email">{user?.email}</p>
      <p data-testid="picture">{user?.picture}</p>
      <p data-testid="uid">{user?.uid}</p>
    </>
  );
};

describe('AuthProvider', () => {
  const mockedUser = {
    name: 'Name',
    email: 'email@example.com',
    picture: 'http://pic.com',
    uid: 'uid',
  };
  const mockedSignIn = jest.fn();
  const mockedSignOut = jest.fn();
  const mockedUseUser = jest.fn(() => mockedUser);
  const mockedUseSignIn = jest.fn(() => mockedSignIn);
  const mockedUseSignOut = jest.fn(() => mockedSignOut);
  const mockedUseRefreshToken = jest.fn();

  test('passes value to component context', () => {
    // Arrange
    (useUser as unknown as jest.Mock).mockImplementationOnce(mockedUseUser);
    (useSignIn as unknown as jest.Mock).mockImplementationOnce(mockedUseSignIn);
    (useSignOut as unknown as jest.Mock).mockImplementationOnce(
      mockedUseSignOut
    );
    (useRefreshToken as unknown as jest.Mock).mockImplementationOnce(
      mockedUseRefreshToken
    );
    // Act
    const { getByTestId } = render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );
    // Assert
    expect(getByTestId('name').textContent).toEqual(mockedUser.name);
    expect(getByTestId('email').textContent).toEqual(mockedUser.email);
    expect(getByTestId('picture').textContent).toEqual(mockedUser.picture);
    expect(getByTestId('uid').textContent).toEqual(mockedUser.uid);

    expect(mockedUseUser).toHaveBeenCalledWith();
    expect(mockedUseSignIn).toHaveBeenCalledWith();
    expect(mockedUseSignOut).toHaveBeenCalledWith();
    expect(mockedUseRefreshToken).toHaveBeenCalledWith();

    expect(mockedSignIn).toHaveBeenCalledWith(mockedSignInEvent);
    expect(mockedSignOut).toHaveBeenCalledWith();
  });
});
