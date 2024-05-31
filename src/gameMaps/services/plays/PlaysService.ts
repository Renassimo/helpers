import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import {
  PlayApiData,
  PlayAttributes,
  PlayAttributesPartial,
  PlayData,
  PlayServerSideData,
  PlaysServerSideData,
} from '@/gameMaps/types';

class PlaysService extends FirestoreService {
  private static instance: PlaysService | null;
  private GAME_MAPS: 'gameMaps';
  private PLAYS: 'plays';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.PLAYS = 'plays';
  }

  // server side methods
  async getAll(uid: string, gameId: string): Promise<PlaysServerSideData> {
    try {
      const plays = await this.db
        .collection(this.GAME_MAPS)
        .doc(uid)
        .collection(this.PLAYS)
        .where('gameId', '==', gameId)
        .get();
      const data: PlayData[] = plays.docs.map((doc) =>
        this.deserializeDoc({ docData: doc })
      );
      return { data, error: null };
    } catch (error: unknown) {
      return { data: null, error: this.deserializeError(error) };
    }
  }

  async getOne(uid: string, id: string): Promise<PlayServerSideData> {
    try {
      const docData = await this.db
        .collection(this.GAME_MAPS)
        .doc(uid)
        .collection(this.PLAYS)
        .doc(id)
        .get();
      const data: PlayData = this.deserializeDoc({ docData });
      return { data, error: null };
    } catch (error: unknown) {
      return { data: null, error: this.deserializeError(error) };
    }
  }

  // api methods
  async create(uid: string, attributes: PlayAttributes): Promise<PlayApiData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.PLAYS)
      .add(attributes);
    const data: PlayData = this.deserializeDoc({
      id: game.id,
      updatedAttributes: attributes,
    });
    return { data };
  }

  async update(
    uid: string,
    id: string,
    attributes: PlayAttributesPartial
  ): Promise<PlayApiData> {
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
    const data: PlayData = this.deserializeDoc({
      docData: docData,
    });

    return { data };
  }

  async delete(uid: string, id: string): Promise<PlayApiData> {
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
