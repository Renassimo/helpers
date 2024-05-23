import { useContext } from 'react';

import AuthContext from '@/auth/contexts/AuthContext';

import { User } from '@/types/auth';

const useAuth = (serverSideUser: User | null = null) => {
  const { user, ...props } = useContext(AuthContext);
  return { user: user ?? serverSideUser, ...props };
};

export default useAuth;
