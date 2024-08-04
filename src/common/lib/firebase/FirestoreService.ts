import { CommonError } from '@/common/types/errors';
import { Firestore, FirestoreDesrializedDoc, FirestoreDocData } from './types';

interface FirestoreService {
  getAll?(...args: string[]): Promise<FirestoreDesrializedDoc[]>;
  getOne?(
    ...args: (string | boolean | undefined)[]
  ): Promise<FirestoreDesrializedDoc>;
  create?(...args: (string | object)[]): Promise<FirestoreDesrializedDoc>;
  update?(...args: (string | object)[]): Promise<FirestoreDesrializedDoc>;
  delete?(...args: string[]): Promise<Record<string, never>>;
}

abstract class FirestoreService {
  constructor(protected db: Firestore) {}

  protected deserializeDoc<T>({
    docData,
    updatedAttributes = {},
    id,
  }: {
    docData?: FirestoreDocData;
    id?: string;
    updatedAttributes?: object;
  }) {
    return <T>{
      id: id ?? docData?.id,
      attributes: docData?.data() ?? updatedAttributes,
    };
  }

  deserializeError(error: unknown) {
    const message = (error as CommonError)?.message ?? null;
    return { message };
  }
}

export default FirestoreService;
