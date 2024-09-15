import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Avia } from '@/avia/types/avia';
import { Firestore } from '@/common/lib/firebase/types';
import { Matcher } from '@/common/types/matchers';

class AviaMatchersService extends FirestoreService {
  private static instance: AviaMatchersService | null;
  private AVIA: 'avia';
  private MATCHERS: 'matchers';
  private supportedKeys: (
    | 'airlines'
    | 'airports'
    | 'manufacturers'
    | 'models'
  )[];

  private constructor(db: Firestore) {
    super(db);
    this.AVIA = 'avia';
    this.MATCHERS = 'matchers';
    this.supportedKeys = ['airlines', 'airports', 'manufacturers', 'models'];
  }

  async getAll<AM = Avia.Matchers>(uid: string): Promise<AM> {
    const matchersCollection = await this.db
      .collection(this.AVIA)
      .doc(uid)
      .collection(this.MATCHERS)
      .get();

    const result: Avia.Matchers = {
      airlines: {},
      airports: {},
      manufacturers: {},
      models: {},
    };

    this.supportedKeys.forEach((supportedKey) => {
      const docData =
        matchersCollection.docs.find(({ id }) => id === supportedKey)?.data() ??
        {};
      if (!this.isObject(docData)) return;

      result[supportedKey] = this.getValidMatcher(docData);
    });

    return result as Avia.Matchers as AM;
  }

  async update<AM = Avia.Matchers>(
    uid: string,
    matchers: Partial<Avia.Matchers>
  ): Promise<AM> {
    const batch = this.db.batch();

    this.supportedKeys.forEach((key) => {
      const matcher = matchers[key];
      if (!matcher || !this.isObject(matcher)) return;

      const ref = this.db
        .collection(this.AVIA)
        .doc(uid)
        .collection(this.MATCHERS)
        .doc(key);

      batch.update(ref, this.getValidMatcher(matcher));
    });

    await batch.commit();

    return this.getAll(uid);
  }

  private isObject(data: any): boolean {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
  }

  private getValidMatcher(data: Record<string, any>): Matcher {
    const m: Matcher = {};

    Object.entries(data).forEach(([id, value]) => {
      if (typeof value !== 'string') return;
      m[id] = value;
    });

    return m;
  }

  static getInstance(db: Firestore): AviaMatchersService {
    if (!this.instance) this.instance = new AviaMatchersService(db);
    return this.instance;
  }

  static clearInstanceForTest(): void {
    this.instance = null;
  }
}

export default AviaMatchersService;