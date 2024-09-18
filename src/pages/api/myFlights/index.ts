import { getFirestore } from 'firebase-admin/firestore';

import { withAuthApi } from '@/common/lib/middlewares/withAuth';

import handler from '@/myFlights/handlers/api/createGet';

export default withAuthApi(handler, getFirestore(), 'myFlights');
