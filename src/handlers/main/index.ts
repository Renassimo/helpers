import getServerSideProps from './getServerSideProps';
import { withAuthServerSideProps } from '@/lib/middlewares/withAuth';

const getServerSidePropsWithAuth = withAuthServerSideProps(getServerSideProps);

export { getServerSidePropsWithAuth as getServerSideProps };
