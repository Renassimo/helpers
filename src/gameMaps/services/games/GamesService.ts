import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { GameData, GamesApiData } from '@/gameMaps/types';

class GamesService extends FirestoreService {
  private collections: string[];
  private static instance: GamesService | null;

  private constructor(db: Firestore) {
    super(db);
    this.collections = ['gameMaps', 'games'];
  }

  async getAll(uid: string): Promise<GamesApiData> {
    try {
      const games = await this.db
        .collection(this.collections[0])
        .doc(uid)
        .collection(this.collections[1])
        .get();
      const data: GameData[] = games.docs.map((doc) =>
        this.deserializeDoc(doc)
      );
      return { data, error: null };
    } catch (error: unknown) {
      console.error(error);
      return { data: null, error: this.deserializeError(error) };
    }
  }

  static getInstance(db: Firestore) {
    if (!this.instance) this.instance = new GamesService(db);
    return this.instance;
  }

  static clearInstanceForTest() {
    this.instance = null;
  }
}

export default GamesService;
