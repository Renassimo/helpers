import getServerSideProps from './getServerSideProps';
import { withAuthServerSideProps } from '@/common/lib/middlewares/withAuth';

const getServerSidePropsWithAuth = withAuthServerSideProps(
  getServerSideProps,
  'fiveBook'
);

export { getServerSidePropsWithAuth as getServerSideProps };
export { default as getDay } from './getDay';
export { default as updateDay } from './updateDay';
