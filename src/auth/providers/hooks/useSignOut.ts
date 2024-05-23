import { useCallback } from 'react';
import Router from 'next/router';

import firebase from '@/common/lib/firebase/client';

import useAlerts from '@/common/hooks/alerts';

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
