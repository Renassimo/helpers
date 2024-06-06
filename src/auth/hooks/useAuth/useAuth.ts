import { useContext } from 'react';

import AuthContext from '@/auth/contexts/AuthContext';

import { User } from '@/auth/types';

const useAuth = (serverSideUser: User | null = null) => {
  const { user, ...props } = useContext(AuthContext);
  return { user: user ?? serverSideUser, ...props };
};

export default useAuth;
