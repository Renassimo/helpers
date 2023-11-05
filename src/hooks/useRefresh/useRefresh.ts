import { useRouter } from 'next/router';

const useRefresh = () => {
  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  return { refreshData };
};

export default useRefresh;
