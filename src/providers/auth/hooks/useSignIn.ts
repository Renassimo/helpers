import { useCallback } from 'react';
import Router from 'next/router';

import { UrlObject } from 'url';

import firebase from '@/lib/firebase/client';
import GoogleAuthProvider from '@/lib/firebase/google';

const useSignIn = () =>
  useCallback(async (redirect?: string | UrlObject) => {
    await firebase.auth().signInWithPopup(new GoogleAuthProvider());
    if (redirect) await Router.push(redirect);
  }, []);

export default useSignIn;
