import { createContext } from 'react';

import { UrlObject } from 'url';
import { User } from '@/auth/types';

const AuthContext = createContext<{
  user: User | null;
  signIn: (redirect?: string | UrlObject) => Promise<void> | void;
  signOut: () => Promise<void> | void;
}>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;
