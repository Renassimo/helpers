import { useCallback } from 'react';
import Router from 'next/router';

import firebase from '@/lib/firebase/client';

const useSignOut = () =>
  useCallback(async () => {
    await firebase.auth().signOut();
    Router.reload();
  }, []);

export default useSignOut;
