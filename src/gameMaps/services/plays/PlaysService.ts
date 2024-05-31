import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { PlayAttributes, PlayData } from '@/gameMaps/types';

class PlaysService extends FirestoreService {
  private static instance: PlaysService | null;
  private GAME_MAPS: 'gameMaps';
  private PLAYS: 'plays';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.PLAYS = 'plays';
  }

  async getAll(uid: string, gameId: string): Promise<PlayData[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.PLAYS)
      .where('gameId', '==', gameId)
      .get();
    return plays.docs.map((doc) => this.deserializeDoc({ docData: doc }));
  }

  async getOne(uid: string, id: string): Promise<PlayData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.PLAYS)
      .doc(id)
      .get();
    return this.deserializeDoc({ docData });
  }

  async create(uid: string, attributes: PlayAttributes): Promise<PlayData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.PLAYS)
      .add(attributes);
    return this.deserializeDoc({
      id: game.id,
      updatedAttributes: attributes,
    });
  }

  async update(
    uid: string,
    id: string,
    attributes: Partial<PlayAttributes>
  ): Promise<PlayData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.PLAYS)
      .doc(id)
      .update({ ...attributes });
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.PLAYS)
      .doc(id)
      .get();
    return this.deserializeDoc({
      docData: docData,
    });
  }

  async delete(uid: string, id: string): Promise<Record<string, never>> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
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
