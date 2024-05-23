import getServerSideProps from './getServerSideProps';
import { withAuthServerSideProps } from '@/common/lib/middlewares/withAuth';

const getServerSidePropsWithAuth = withAuthServerSideProps(getServerSideProps);

export { getServerSidePropsWithAuth as getServerSideProps };
