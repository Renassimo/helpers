import firebase from '@/lib/firebase/client';

const refreshToken = async () => {
  const user = firebase.auth().currentUser;
  if (user) await user.getIdToken(true);
};

export default refreshToken;
