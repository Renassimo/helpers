import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import handler from '@/spotting/handlers/api/create';

export default withAuthApi(handler, getFirestore(), 'spotting');
