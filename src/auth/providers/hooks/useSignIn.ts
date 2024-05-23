import { useCallback } from 'react';
import Router from 'next/router';

import { UrlObject } from 'url';

import firebase from '@/common/lib/firebase/client';
import GoogleAuthProvider from '@/common/lib/firebase/google';

import useAlerts from '@/common/hooks/alerts';

const useSignIn = () => {
  const { createErrorAlert } = useAlerts();

  return useCallback(
    async (redirect?: string | UrlObject) => {
      try {
        await firebase.auth().signInWithPopup(new GoogleAuthProvider());
        if (redirect) await Router.push(redirect);
      } catch (error: any) {
        createErrorAlert(error.message);
      }
    },
    [createErrorAlert]
  );
};

export default useSignIn;
