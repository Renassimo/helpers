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
    playId: string
  ): Promise<ItemData[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .get();
    return plays.docs.map((doc) =>
      this.filterAttributesForClient(
        this.deserializeDoc({ docData: doc }),
        playId
      )
    );
  }

  async getAllByCategory(
    uid: string,
    gameId: string,
    categoryId: string
  ): Promise<{ id: string }[]> {
    const plays = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .where('categoryId', '==', categoryId)
      .get();
    return plays.docs.map((doc) => ({ id: doc.id }));
  }

  async getOne(
    uid: string,
    gameId: string,
    id: string,
    playId?: string
  ): Promise<ItemData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .doc(id)
      .get();
    return this.filterAttributesForClient(
      this.deserializeDoc<ItemData>({ docData }),
      playId
    );
  }

  async create(
    uid: string,
    gameId: string,
    attributes: ItemAttributes
  ): Promise<ItemData> {
    const { playId, collected, categoryId, coordinates, description } =
      attributes;
    const withCollectedByPlayId = playId
      ? {
          collectedByPlayId: {
            [playId]: collected,
          },
        }
      : {};
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .add({
        categoryId,
        coordinates,
        description,
        ...withCollectedByPlayId,
      });
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
    const { playId } = attributes;

    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(gameId)
      .collection(this.ITEMS)
      .doc(id)
      .update(this.filterPartialAttributes(attributes));
    return this.getOne(uid, gameId, id, playId);
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

  private filterAttributesForClient(data: ItemData, playId?: string): ItemData {
    const withPlayId = playId ? { playId } : {};
    const {
      collectedByPlayId,
      categoryId,
      coordinates,
      description = '',
    } = data.attributes;
    return {
      ...data,
      attributes: {
        ...withPlayId,
        categoryId,
        coordinates,
        description,
        collected: !!collectedByPlayId?.[playId ?? ''],
      },
    };
  }

  private filterPartialAttributes(
    attributes: Partial<ItemAttributes>
  ): Partial<ItemAttributes> {
    const { playId, collected, categoryId, coordinates, description } =
      attributes;

    const withCollected =
      typeof playId !== 'undefined' && typeof collected !== 'undefined'
        ? { [`collectedByPlayId.${playId}`]: collected }
        : {};
    const filteredAttributes: Partial<ItemAttributes> = {
      ...withCollected,
    };

    if (typeof categoryId !== 'undefined')
      filteredAttributes.categoryId = categoryId;
    if (typeof coordinates !== 'undefined')
      filteredAttributes.coordinates = coordinates;
    if (typeof description !== 'undefined')
      filteredAttributes.description = description;

    return filteredAttributes;
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
