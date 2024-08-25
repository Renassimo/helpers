import { getFirestore } from 'firebase-admin/firestore';
import getServerSideProps from './getServerSideProps';
import { withAuthServerSideProps } from '@/common/lib/middlewares/withAuth';

const getServerSidePropsWithAuth = withAuthServerSideProps(
  getServerSideProps,
  getFirestore(),
  'myFlights'
);

export { getServerSidePropsWithAuth as getServerSideProps };
