import { useContext } from 'react';

import AuthContext from '@/contexts/auth';

import { User } from '@/types';

const useAuth = (serverSideUser: User | null = null) => {
  const { user, ...props } = useContext(AuthContext);
  return { user: user ?? serverSideUser, ...props };
};

export default useAuth;
