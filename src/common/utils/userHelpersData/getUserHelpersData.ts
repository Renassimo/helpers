import firestore from '@/common/lib/firebase/firestore';
import { UserHelpersData } from '@/common/types/helpers';

const getUserHelpersData = async (uid: string): Promise<UserHelpersData> => {
  try {
    const doc = await firestore.collection('users').doc(uid).get();
    const { helpersData = null } = doc?.data() ?? {};

    return { id: doc?.id ?? uid, helpersData };
  } catch (error) {
    return { id: uid, helpersData: null };
  }
};

export default getUserHelpersData;
