import firebaseAdmin from 'firebase-admin';

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY ?? '');

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const firestore = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();

async function getUserData(uid: string) {
  const doc = await firestore.collection('users').doc(uid).get();
  return { id: doc.id, ...doc.data() };
}

export { firebaseAdmin, firestore, auth, getUserData };
