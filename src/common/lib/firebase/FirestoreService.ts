import { CommonError } from '@/common/types/errors';
import { Firestore, FirestoreApiData, FirestoreDocData } from './types';

interface FirestoreService {
  getAll?(...args: string[]): Promise<FirestoreApiData>;
  getOne?(...args: string[]): Promise<FirestoreApiData>;
  create?(...args: string[]): Promise<FirestoreApiData>;
  update?(...args: string[]): Promise<FirestoreApiData>;
  delete?(...args: string[]): Promise<FirestoreApiData>;
}

abstract class FirestoreService {
  constructor(protected db: Firestore) {}

  protected deserializeDoc<T>(doc: FirestoreDocData) {
    return <T>{ id: doc.id, attributes: doc.data() };
  }

  protected deserializeError(error: unknown) {
    console.error(error);
    const message = (error as CommonError)?.message ?? null;

    return { message };
  }
}

export default FirestoreService;
