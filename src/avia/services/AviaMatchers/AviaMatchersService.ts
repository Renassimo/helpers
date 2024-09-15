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

      const validMatcher = this.getValidMatcher(docData);
      if (!validMatcher) return;

      result[supportedKey] = validMatcher;
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

      const validMatcher = this.getValidMatcher(matcher);
      if (!validMatcher) return;

      const ref = this.db
        .collection(this.AVIA)
        .doc(uid)
        .collection(this.MATCHERS)
        .doc(key);

      batch.update(ref, validMatcher);
    });

    await batch.commit();

    return this.getAll(uid);
  }

  private isObject(data: any): boolean {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
  }

  private getValidMatcher(data: Record<string, any>): Matcher | null {
    const matcher: Matcher = {};

    Object.entries(data).forEach(([id, value]) => {
      if (typeof value !== 'string') return;
      matcher[id] = value;
    });

    if (Object.keys(matcher).length === 0) return null;

    return matcher;
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
