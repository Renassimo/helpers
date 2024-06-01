import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { GameAttributes, GameData } from '@/gameMaps/types';

class GamesService extends FirestoreService {
  private static instance: GamesService | null;
  private GAME_MAPS: 'gameMaps';
  private GAMES: 'games';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.GAMES = 'games';
  }

  async getAll(uid: string): Promise<GameData[]> {
    const games = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .get();
    return games.docs.map((doc) => this.deserializeDoc({ docData: doc }));
  }

  async getOne(uid: string, id: string): Promise<GameData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .get();
    return this.deserializeDoc({ docData });
  }

  async create(uid: string, attributes: GameAttributes): Promise<GameData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .add(attributes);
    return this.deserializeDoc({
      id: game.id,
      updatedAttributes: attributes,
    });
  }

  async update(
    uid: string,
    id: string,
    attributes: Partial<GameAttributes>
  ): Promise<GameData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .update({ ...attributes });
    return this.getOne(uid, id);
  }

  async delete(uid: string, id: string): Promise<Record<string, never>> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .delete();
    return {};
  }

  static getInstance(db: Firestore): GamesService {
    if (!this.instance) this.instance = new GamesService(db);
    return this.instance;
  }

  static clearInstanceForTest(): void {
    this.instance = null;
  }
}

export default GamesService;
