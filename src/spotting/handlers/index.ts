import { getFirestore } from 'firebase-admin/firestore';
import getServerSideProps from './getServerSideProps';
import { withAuthServerSideProps } from '@/common/lib/middlewares/withAuth';

const getServerSidePropsWithAuth = withAuthServerSideProps(
  getServerSideProps,
  getFirestore(),
  'spotting'
);

export { getServerSidePropsWithAuth as getServerSideProps };
export { default as getSpottedPlanes } from './getSpottedPlanes';
export { default as updateSpottedPlanes } from './updateSpottedPlanes';
