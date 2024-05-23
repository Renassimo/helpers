import { useEffect, useState } from 'react';

import { User } from '@/types/auth';

import firebase from '@/lib/firebase/client';

import getIdTokenChangedCallback from '../utils/getIdTokenChangedCallback';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(getIdTokenChangedCallback(setUser));
  }, []);

  return user;
};

export default useUser;
