import AuthContext from '@/contexts/auth';
import { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';

const mockedSignInEvent = 'signIn';

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

describe('AuthContext', () => {
  const mockedUser = {
    name: 'Name',
    email: 'email@example.com',
    picture: 'http://pic.com',
    uid: 'uid',
  };
  const mockedSignIn = jest.fn();
  const mockedSignOut = jest.fn();
  const mockedValue = {
    user: mockedUser,
    signIn: mockedSignIn,
    signOut: mockedSignOut,
  };

  test('passes value to component context', () => {
    // Arrange
    // Act
    const { getByTestId } = render(
      <AuthContext.Provider value={mockedValue}>
        <TestingComponent />
      </AuthContext.Provider>
    );

    // Assert
    expect(getByTestId('name').textContent).toEqual(mockedUser.name);
    expect(getByTestId('email').textContent).toEqual(mockedUser.email);
    expect(getByTestId('picture').textContent).toEqual(mockedUser.picture);
    expect(getByTestId('uid').textContent).toEqual(mockedUser.uid);

    expect(mockedSignIn).toHaveBeenCalledWith(mockedSignInEvent);
    expect(mockedSignOut).toHaveBeenCalledWith();
  });
});
