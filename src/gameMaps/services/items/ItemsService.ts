import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { ItemAttributes, ItemData } from '@/gameMaps/types';

class ItemsService extends FirestoreService {
  private static instance: ItemsService | null;
  private GAME_MAPS: 'gameMaps';
  private GAMES: 'games';
  private ITEMS: 'items';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.GAMES = 'games';
    this.ITEMS = 'items';
  }

  async getAll(
    uid: string,
    gameId: string,
    filterById: string,
    filterBy = 'playId'
  ): Promise<ItemData[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .where(filterBy, '==', filterById)
      .get();
    return plays.docs.map((doc) => this.deserializeDoc({ docData: doc }));
  }

  async getOne(uid: string, gameId: string, id: string): Promise<ItemData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .doc(id)
      .get();
    return this.deserializeDoc({ docData });
  }

  async create(
    uid: string,
    gameId: string,
    attributes: ItemAttributes
  ): Promise<ItemData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
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
    attributes: Partial<ItemAttributes>
  ): Promise<ItemData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
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
      .collection(this.ITEMS)
      .doc(id)
      .delete();
    return {};
  }

  static getInstance(db: Firestore): ItemsService {
    if (!this.instance) this.instance = new ItemsService(db);
    return this.instance;
  }

  static clearInstanceForTest(): void {
    this.instance = null;
  }
}

export default ItemsService;
