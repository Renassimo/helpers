import { CommonError } from '@/common/types/errors';
import {
  Firestore,
  FirestoreApiData,
  FirestoreDocData,
  FirestoreServerSideData,
} from './types';

interface FirestoreService {
  // server side methods
  getAll?(...args: string[]): Promise<FirestoreServerSideData>;
  getOne?(...args: string[]): Promise<FirestoreServerSideData>;
  // api methods
  create?(...args: (string | object)[]): Promise<FirestoreApiData>;
  update?(...args: (string | object)[]): Promise<FirestoreApiData>;
  delete?(...args: string[]): Promise<FirestoreApiData>;
}

abstract class FirestoreService {
  constructor(protected db: Firestore) {}

  protected deserializeDoc<T>({
    docData,
    updatedAttributes = {},
    id,
  }: {
    docData?: FirestoreDocData;
    updatedAttributes?: object;
    id?: string;
  }) {
    return <T>{
      id: id ?? docData?.id,
      attributes: docData
        ? { ...docData?.data(), ...updatedAttributes }
        : updatedAttributes,
    };
  }

  protected deserializeError(error: unknown) {
    const message = (error as CommonError)?.message ?? null;
    return { message };
  }
}

export default FirestoreService;
