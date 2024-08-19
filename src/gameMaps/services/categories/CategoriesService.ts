import FirestoreService from '@/common/lib/firebase/FirestoreService';

import { Firestore } from '@/common/lib/firebase/types';
import { CategoryAttributes, CategoryData } from '@/gameMaps/types';

class CategoriesService extends FirestoreService {
  private static instance: CategoriesService | null;
  private GAME_MAPS: 'gameMaps';
  private GAMES: 'games';
  private CATEGORIES: 'categories';

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.GAMES = 'games';
    this.CATEGORIES = 'categories';
  }

  async getAll(uid: string, gameId: string): Promise<CategoryData[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.CATEGORIES)
      .orderBy('title')
      .get();
    return plays.docs.map((doc) => this.deserializeDoc({ docData: doc }));
  }

  async getOne(uid: string, gameId: string, id: string): Promise<CategoryData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.CATEGORIES)
      .doc(id)
      .get();
    return this.deserializeDoc({ docData });
  }

  async create(
    uid: string,
    gameId: string,
    attributes: CategoryAttributes
  ): Promise<CategoryData> {
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.CATEGORIES)
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
    attributes: Partial<CategoryAttributes>
  ): Promise<CategoryData> {
    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.CATEGORIES)
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
      .collection(this.CATEGORIES)
      .doc(id)
      .delete();
    return {};
  }

  static getInstance(db: Firestore): CategoriesService {
    if (!this.instance) this.instance = new CategoriesService(db);
    return this.instance;
  }

  static clearInstanceForTest(): void {
    this.instance = null;
  }
}

export default CategoriesService;
