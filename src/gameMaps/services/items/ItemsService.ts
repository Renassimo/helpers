import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { ItemAttributes, ItemData } from '@/gameMaps/types';

class ItemsService extends FirestoreService {
  private static instance: ItemsService | null;
  private GAME_MAPS: 'gameMaps';
  private ITEMS: 'items';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.ITEMS = 'items';
  }

  async getAll(uid: string, playId: string): Promise<ItemData[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.ITEMS)
      .where('playId', '==', playId)
      .get();
    return plays.docs.map((doc) => this.deserializeDoc({ docData: doc }));
  }

  async getOne(uid: string, id: string): Promise<ItemData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.ITEMS)
      .doc(id)
      .get();
    return this.deserializeDoc({ docData });
  }

  async create(uid: string, attributes: ItemAttributes): Promise<ItemData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.ITEMS)
      .add(attributes);
    return this.deserializeDoc({
      id: game.id,
      updatedAttributes: attributes,
    });
  }

  async update(
    uid: string,
    id: string,
    attributes: Partial<ItemAttributes>
  ): Promise<ItemData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.ITEMS)
      .doc(id)
      .update({ ...attributes });
    return this.getOne(uid, id);
  }

  async delete(uid: string, id: string): Promise<Record<string, never>> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
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
