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
      .orderBy('title')
      .get();
    return plays.docs.map((doc) => {
      const data = this.deserializeDoc<PlayData>({ docData: doc });
      const { id, attributes } = data;
      return { id, attributes: this.filterAttributes(attributes) };
    });
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
    const data = this.deserializeDoc<PlayData>({ docData });
    return { id: data.id, attributes: this.filterAttributes(data.attributes) };
  }

  async create(
    uid: string,
    gameId: string,
    attributes: PlayAttributes
  ): Promise<PlayData> {
    const date = String(new Date());
    const filteredAttributes = this.filterAttributes({
      ...attributes,
      createdAt: date,
      updatedAt: date,
    });
    const play = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .add(filteredAttributes);
    return await this.getOne(uid, gameId, play.id);
  }

  async update(
    uid: string,
    gameId: string,
    id: string,
    attributes: Partial<PlayAttributes>
  ): Promise<PlayData> {
    const filteredAttributes: Partial<PlayAttributes> =
      this.filterPartialAttributes({
        ...attributes,
        updatedAt: String(new Date()),
      });
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.PLAYS)
      .doc(id)
      .update({ ...filteredAttributes });
    return await this.getOne(uid, gameId, id);
  }

  async updateDate(
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
      .update({ ...{ updatedAt: String(new Date()) } });
    return {};
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

  private filterAttributes(attributes: PlayAttributes): PlayAttributes {
    const { title = '', description = '', createdAt, updatedAt } = attributes;

    const withCreatedAt = createdAt ? { createdAt } : {};
    const withUpdatedAt = updatedAt ? { updatedAt } : {};

    const filteredAttributes: PlayAttributes = {
      title,
      description,
      ...withCreatedAt,
      ...withUpdatedAt,
    };
    return filteredAttributes;
  }

  private filterPartialAttributes(
    attributes: Partial<PlayAttributes>
  ): Partial<PlayAttributes> {
    const { title, description, createdAt, updatedAt } = attributes;
    const filteredAttributes: Partial<PlayAttributes> = {};

    if (typeof title !== 'undefined') filteredAttributes.title = title;
    if (typeof description !== 'undefined')
      filteredAttributes.description = description;
    if (typeof createdAt !== 'undefined')
      filteredAttributes.createdAt = createdAt;
    if (typeof updatedAt !== 'undefined')
      filteredAttributes.updatedAt = updatedAt;

    return filteredAttributes;
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
