import { useCallback } from 'react';
import Router from 'next/router';

import firebase from '@/lib/firebase/client';

import useAlerts from '@/hooks/alerts';

const useSignOut = () => {
  const { createErrorAlert } = useAlerts();

  return useCallback(async () => {
    try {
      await firebase.auth().signOut();
      Router.reload();
    } catch (error: any) {
      createErrorAlert(error.message);
    }
  }, [createErrorAlert]);
};

export default useSignOut;
