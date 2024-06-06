import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import handler from '@/gameMaps/handlers/games/api/updateDelete';

export default withAuthApi(handler, getFirestore());
