import { Dispatch } from 'react';
import nookies from 'nookies';

import { User } from '@/types/auth';

const getIdTokenChangedCallback = (setUser: Dispatch<User | null>) => {
  return async (user: any) => {
    if (!user) {
      setUser(null);
      nookies.set(undefined, 'token', '', { path: '/' });
    } else {
      const token = await user.getIdToken();
      const {
        email = '',
        displayName = '',
        photoURL = '',
        uid = '',
        // @ts-ignore - todo resolve it
      } = user.multiFactor.user;
      setUser({ email, name: displayName, picture: photoURL, uid });
      nookies.set(undefined, 'token', token, { path: '/' });
    }
  };
};

export default getIdTokenChangedCallback;
