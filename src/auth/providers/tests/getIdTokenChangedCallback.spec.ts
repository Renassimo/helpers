import nookies from 'nookies';
import getIdTokenChangedCallback from '../utils/getIdTokenChangedCallback';

jest.mock('nookies');

describe('getIdTokenChangedCallback', () => {
  const mockedNookiesSet = jest.fn();
  const mockedSetUser = jest.fn();

  beforeEach(() => {
    (nookies.set as unknown as jest.Mock).mockImplementationOnce(
      mockedNookiesSet
    );
  });

  describe('when got user', () => {
    test('sets user', async () => {
      // Arrange
      const mockedEmail = 'email@example.com';
      const mockedDisplayName = 'Name';
      const mockedPhotoURL = 'https://pic.com';
      const mockedUid = 'uid';
      const mockedToken = 'token';
      const mockedUser = {
        getIdToken: async () => mockedToken,
        multiFactor: {
          user: {
            email: mockedEmail,
            displayName: mockedDisplayName,
            photoURL: mockedPhotoURL,
            uid: mockedUid,
          },
        },
      };
      // Act
      await getIdTokenChangedCallback(mockedSetUser)(mockedUser);
      expect(mockedSetUser).toHaveBeenCalledWith({
        email: mockedEmail,
        name: mockedDisplayName,
        picture: mockedPhotoURL,
        uid: mockedUid,
      });
      expect(mockedNookiesSet).toHaveBeenCalledWith(
        undefined,
        'token',
        mockedToken,
        {
          path: '/',
        }
      );
      // Assert
    });
  });

  describe('when got no user', () => {
    test('clears user', async () => {
      // Arrange
      const mockedUser = null;
      // Act
      await getIdTokenChangedCallback(mockedSetUser)(mockedUser);
      // Assert
      expect(mockedSetUser).toHaveBeenCalledWith(null);
      expect(mockedNookiesSet).toHaveBeenCalledWith(undefined, 'token', '', {
        path: '/',
      });
    });
  });
});
