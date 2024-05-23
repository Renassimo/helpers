import firebase from '@/common/lib/firebase/client';

const refreshToken = async () => {
  const user = firebase.auth().currentUser;
  if (user) await user.getIdToken(true);
};

export default refreshToken;
