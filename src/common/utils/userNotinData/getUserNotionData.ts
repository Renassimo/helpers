import firestore from '@/common/lib/firebase/firestore';

const getUserNotionData = async (uid: string) => {
  try {
    const doc = await firestore.collection('users').doc(uid).get();
    const { notionData = null } = doc?.data() ?? {};

    return { id: doc?.id ?? uid, notionData };
  } catch (error) {
    return { id: uid, notionData: null };
  }
};

export default getUserNotionData;
