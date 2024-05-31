import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import handler from '@/fiveBook/handlers/api/update';

export default withAuthApi(handler, getFirestore(), 'fiveBook');
