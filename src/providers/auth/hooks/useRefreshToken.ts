import { useEffect } from 'react';

import refreshTokenInInterval from '../utils/refreshTokenInInterval';

const useRefreshToken = () =>
  useEffect(() => {
    const handle = refreshTokenInInterval();
    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

export default useRefreshToken;
