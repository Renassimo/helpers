import { UserHelpersData } from '@/common/types/helpers';
import { Firestore } from '@/common/lib/firebase/types';

const getUserHelpersData = async (
  uid: string,
  db: Firestore
): Promise<UserHelpersData> => {
  try {
    const doc = await db.collection('users').doc(uid).get();
    const { helpersData = null } = doc?.data() ?? {};

    return { id: doc?.id ?? uid, helpersData };
  } catch (error) {
    return { id: uid, helpersData: null };
  }
};

export default getUserHelpersData;
