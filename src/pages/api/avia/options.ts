import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import handler from '@/avia/handlers/api/options/get';

export default withAuthApi(handler, getFirestore(), 'avia');
