import FirestoreService from '@/common/lib/firebase/FirestoreService';
import { getStorage } from 'firebase-admin/storage';

import { Firestore, Storage } from '@/common/lib/firebase/types';
import { GameAttributes, GameData } from '@/gameMaps/types';

class GamesService extends FirestoreService {
  private static instance: GamesService | null;
  private GAME_MAPS: 'gameMaps';
  private GAMES: 'games';
  private bucket: string;
  private storage: Storage;

  private constructor(db: Firestore) {
    super(db);
    this.GAME_MAPS = 'gameMaps';
    this.GAMES = 'games';
    this.storage = getStorage();
    this.bucket = process.env.FIREBASE_STORAGE_BUCKET ?? '';
  }

  async getAll(uid: string): Promise<GameData[]> {
    const games = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .get();
    return games.docs.map((doc) => {
      const data = this.deserializeDoc<GameData>({ docData: doc });
      const { id, attributes } = data;
      return { id, attributes: this.filterAttributes(attributes) };
    });
  }

  async getOne(
    uid: string,
    id: string,
    withMapImageId = false
  ): Promise<GameData> {
    const docData = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .get();
    const data = this.deserializeDoc<GameData>({ docData });
    const { attributes } = data;
    const filteredAttributes = this.filterAttributes(
      attributes,
      withMapImageId
    );
    if (withMapImageId) {
      return { id: data.id, attributes: { ...filteredAttributes } };
    }
    const mapImageUrl = await this.getMapImageUrl(attributes.mapImageId);
    return { id: data.id, attributes: { ...filteredAttributes, mapImageUrl } };
  }

  async create(uid: string, attributes: GameAttributes): Promise<GameData> {
    const filteredAttributes = this.filterAttributes(attributes, true);
    const game = await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .add(filteredAttributes);
    const data = await this.getOne(uid, game.id, true);
    return { id: data.id, attributes: this.filterAttributes(data.attributes) };
  }

  async update(
    uid: string,
    id: string,
    attributes: Partial<GameAttributes>
  ): Promise<GameData> {
    const filteredAttributes: Partial<GameAttributes> =
      this.filterPartialAttributes(attributes);
    const { mapImageId } = filteredAttributes;

    const oldData = await this.getOne(uid, id, true);

    await this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id)
      .update({ ...filteredAttributes });

    if (
      typeof mapImageId !== 'undefined' &&
      mapImageId !== oldData.attributes.mapImageId
    ) {
      await this.deleteMapImage(oldData.attributes.mapImageId);
    }

    return await this.getOne(uid, id);
  }

  async delete(uid: string, id: string): Promise<Record<string, never>> {
    const oldData = await this.getOne(uid, id, true);
    await this.deleteMapImage(oldData.attributes.mapImageId);

    const gameRef = this.db
      .collection(this.GAME_MAPS)
      .doc(uid)
      .collection(this.GAMES)
      .doc(id);
    await this.db.recursiveDelete(gameRef);
    return {};
  }

  private filterAttributes(
    attributes: GameAttributes,
    withMapImageId = false
  ): GameAttributes {
    const {
      title = '',
      description = '',
      backgroundColor = '',
      mapImageId = '',
    } = attributes;
    const filteredAttributes: GameAttributes = {
      title,
      description,
      backgroundColor,
    };
    if (withMapImageId) filteredAttributes.mapImageId = mapImageId;
    return filteredAttributes;
  }

  private filterPartialAttributes(
    attributes: Partial<GameAttributes>
  ): Partial<GameAttributes> {
    const { title, description, backgroundColor, mapImageId } = attributes;
    const filteredAttributes: Partial<GameAttributes> = {};

    if (typeof title !== 'undefined') filteredAttributes.title = title;
    if (typeof description !== 'undefined')
      filteredAttributes.description = description;
    if (typeof backgroundColor !== 'undefined')
      filteredAttributes.backgroundColor = backgroundColor;
    if (typeof mapImageId !== 'undefined')
      filteredAttributes.mapImageId = mapImageId;

    return filteredAttributes;
  }

  private async getMapImageUrl(mapImageId?: string): Promise<string> {
    if (!mapImageId) return '';

    const url = await this.storage
      ?.bucket(this.bucket)
      .file(mapImageId)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      });

    return url?.[0] ?? '';
  }

  private async deleteMapImage(mapImageId?: string): Promise<void> {
    if (mapImageId) {
      await this.storage
        ?.bucket(this.bucket)
        .file(mapImageId)
        .delete({ ignoreNotFound: true });
    }
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
