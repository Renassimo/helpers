import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { PlayAttributes, PlayData } from '@/gameMaps/types';

class PlaysService extends FirestoreService {
  private static instance: PlaysService | null;
  private GAME_MAPS: 'gameMaps';
  private GAMES: 'games';
  private PLAYS: 'plays';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.GAMES = 'games';
    this.PLAYS = 'plays';
  }

  async getAll(uid: string, gameId: string): Promise<PlayData[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .get();
    return plays.docs.map((doc) => this.deserializeDoc({ docData: doc }));
  }

  async getOne(uid: string, gameId: string, id: string): Promise<PlayData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .doc(id)
      .get();
    return this.deserializeDoc({ docData });
  }

  async create(
    uid: string,
    gameId: string,
    attributes: PlayAttributes
  ): Promise<PlayData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .add(attributes);
    return this.deserializeDoc({
      id: game.id,
      updatedAttributes: attributes,
    });
  }

  async update(
    uid: string,
    gameId: string,
    id: string,
    attributes: Partial<PlayAttributes>
  ): Promise<PlayData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .doc(id)
      .update({ ...attributes });
    return this.getOne(uid, gameId, id);
  }

  async delete(
    uid: string,
    gameId: string,
    id: string
  ): Promise<Record<string, never>> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .doc(id)
      .delete();
    return {};
  }

  static getInstance(db: Firestore): PlaysService {
    if (!this.instance) this.instance = new PlaysService(db);
    return this.instance;
  }

  static clearInstanceForTest(): void {
    this.instance = null;
  }
}

export default PlaysService;
