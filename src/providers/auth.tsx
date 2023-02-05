import { useCallback, useEffect, useState, ReactNode } from 'react';
import Router from 'next/router';
import nookies from 'nookies';

import { UrlObject } from 'url';
import { User } from '@/types';

import { firebase } from '@/lib/firebaseClient';
import AuthContext from '@/contexts/auth';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (redirect?: string | UrlObject) => {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (redirect) await Router.push(redirect);
  }, []);

  const signOut = useCallback(async () => {
    await firebase.auth().signOut();
    Router.reload();
  }, []);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
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
          // @ts-ignore
        } = user.multiFactor.user;
        setUser({ email, name: displayName, picture: photoURL, uid });
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
