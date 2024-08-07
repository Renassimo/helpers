import { CommonError } from '@/common/types/errors';
import firestoreNameSpace from 'firebase-admin/lib/firestore';
import storageNameSpace from 'firebase-admin/lib/storage';

export type Firestore = firestoreNameSpace.Firestore;

export type FirestoreDocData = firestoreNameSpace.DocumentData;

export interface FirestoreDesrializedDoc {
  id: string;
  attributes: object;
}

export interface FirestoreApiData {
  data?: FirestoreDesrializedDoc | FirestoreDesrializedDoc[];
  error?: CommonError;
}

export interface FirestoreServerSideData {
  data: FirestoreDesrializedDoc | FirestoreDesrializedDoc[] | null;
  error: CommonError | null;
}

export type Storage = storageNameSpace.Storage;
