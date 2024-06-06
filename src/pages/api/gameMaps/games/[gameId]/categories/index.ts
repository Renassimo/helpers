import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import handler from '@/gameMaps/handlers/categories/api/create';

export default withAuthApi(handler, getFirestore());
