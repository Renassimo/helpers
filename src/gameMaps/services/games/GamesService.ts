import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import {
  GameApiData,
  GameAttributes,
  GameAttributesPartial,
  GameData,
  GameServerSideData,
  GamesServerSideData,
} from '@/gameMaps/types';

class GamesService extends FirestoreService {
  private static instance: GamesService | null;
  private GAME_MAPS: 'gameMaps';
  private GAMES: 'games';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.GAMES = 'games';
  }

  // server side methods
  async getAll(uid: string): Promise<GamesServerSideData> {
    try {
      const games = await this.db
        .collection(this.GAME_MAPS)
        .doc(uid)
        .collection(this.GAMES)
        .get();
      const data: GameData[] = games.docs.map((doc) =>
        this.deserializeDoc({ docData: doc })
      );
      return { data, error: null };
    } catch (error: unknown) {
      return { data: null, error: this.deserializeError(error) };
    }
  }

  async getOne(uid: string, id: string): Promise<GameServerSideData> {
    try {
      const docData = await this.db
        .collection(this.GAME_MAPS)
        .doc(uid)
        .collection(this.GAMES)
        .doc(id)
        .get();
      const data: GameData = this.deserializeDoc({ docData });
      return { data, error: null };
    } catch (error: unknown) {
      return { data: null, error: this.deserializeError(error) };
    }
  }

  // api methods
  async create(uid: string, attributes: GameAttributes): Promise<GameApiData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .add(attributes);
    const data: GameData = this.deserializeDoc({
      id: game.id,
      updatedAttributes: attributes,
    });
    return { data };
  }

  async update(
    uid: string,
    id: string,
    attributes: GameAttributesPartial
  ): Promise<GameApiData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .update({ ...attributes });
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .get();
    const data: GameData = this.deserializeDoc({
      docData: docData,
    });

    return { data };
  }

  async delete(uid: string, id: string): Promise<GameApiData> {
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
