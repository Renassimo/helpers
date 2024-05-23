import refreshToken from './refreshToken';

const refreshTokenInInterval = () =>
  setInterval(async () => {
    await refreshToken();
  }, 10 * 60 * 1000);

export default refreshTokenInInterval;
