import { ReactNode } from 'react';
import AuthContext from '@/auth/contexts/AuthContext';

import useSignIn from './hooks/useSignIn';
import useSignOut from './hooks/useSignOut';
import useRefreshToken from './hooks/useRefreshToken';
import useUser from './hooks/useUser';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const user = useUser();
  // force refresh the token every 10 minutes
  useRefreshToken();

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
