import { Avia } from '@/avia/types/avia';
import { Matcher } from '@/common/types/matchers';
import { Data } from '@/common/types/props';
import { FileWithPath } from 'react-dropzone';

export interface PhotoInfo {
  file: FileWithPath;
  path: string;
  name: string;
  preview: string;
  selected: boolean;
  date: string | null;
  location: Avia.Location | null;
}

export interface PhotoInfosState {
  [path: string]: PhotoInfo;
}

export interface PhotoFolder {
  photos: PhotoInfosState;
  id: string;
  attributes?: Partial<PhotoFolderInfoAttributes>;
}

export interface PhotoFoldersState {
  [id: string]: PhotoFolder;
}

export interface PhotoHandlerState {
  files: FileWithPath[];
  photos: PhotoInfosState;
  folders: PhotoFoldersState;
  zoomedPhoto: PhotoInfo | null;
  showingFolder: PhotoFolder | null;
  place: string | null;
  newMatchers: {
    airlines: Matcher;
    airports: Matcher;
    manufacturers: Matcher;
    models: Matcher;
  };
}

export interface PhotoInfoContextState extends PhotoHandlerState {
  handlingText: string;
  photosList: PhotoInfo[];
  foldersList: PhotoFolder[];
  dispatch: (value: PhotoInfoAction) => void;
  options: Avia.Options | null;
  matchers: Avia.Matchers | null;
  updateMatchers: (data: Partial<Avia.Matchers>) => Promise<void>;
}

export enum PhotoActionType {
  FILES_DROP,
  ADD_PHOTO,
  CLEAR_FILES,
  SELECT_ALL,
  UNSELECT_ALL,
  SELECT,
  SET_ZOOMED_PHOTO,
  CLEAR_ZOOMED_PHOTO,
  CREATE_FOLDER,
  SET_FOLDER_MODAL,
  CLEAR_FOLDER_MODAL,
  REMOVE_FROM_FOLDER,
  REMOVE_FOLDER,
  UPDATE_PLACE,
  SAVE_FOLDER_INFO,
  UPDATE_MATCHERS,
  DUPLICATE_PHOTO,
}

export const defaultPhotosState: PhotoHandlerState = {
  files: [],
  photos: {},
  folders: {},
  zoomedPhoto: null,
  showingFolder: null,
  place: null,
  newMatchers: {
    airlines: {},
    airports: {},
    manufacturers: {},
    models: {},
  },
};

export type PhotoInfoAction =
  | {
      type: PhotoActionType.FILES_DROP;
      payload: FileWithPath[];
    }
  | {
      type: PhotoActionType.ADD_PHOTO;
      payload: PhotoInfo;
    }
  | {
      type: PhotoActionType.CLEAR_FILES;
    }
  | {
      type: PhotoActionType.SELECT_ALL;
    }
  | {
      type: PhotoActionType.UNSELECT_ALL;
    }
  | {
      type: PhotoActionType.SELECT;
      payload: string;
    }
  | {
      type: PhotoActionType.SET_ZOOMED_PHOTO;
      payload: string;
    }
  | {
      type: PhotoActionType.CLEAR_ZOOMED_PHOTO;
    }
  | {
      type: PhotoActionType.CREATE_FOLDER;
    }
  | {
      type: PhotoActionType.SET_FOLDER_MODAL;
      payload: string;
    }
  | {
      type: PhotoActionType.CLEAR_FOLDER_MODAL;
    }
  | {
      type: PhotoActionType.REMOVE_FROM_FOLDER;
      payload: string;
    }
  | {
      type: PhotoActionType.REMOVE_FOLDER;
      payload: string;
    }
  | {
      type: PhotoActionType.UPDATE_PLACE;
      payload?: string | null;
    }
  | {
      type: PhotoActionType.SAVE_FOLDER_INFO;
      payload?: Partial<PhotoFolderInfoAttributes>;
    }
  | {
      type: PhotoActionType.UPDATE_MATCHERS;
      payload: Avia.Matchers | null;
    }
  | {
      type: PhotoActionType.DUPLICATE_PHOTO;
      payload: string;
    };

export interface PhotoFolderInfoAttributes
  extends Record<string, string | number | boolean | null> {
  title: string | null;
  date: string | null;
  place: string | null;
  photosUrl: string | null;
  extraLink: string | null;
  planespottersUrl: string | null;
  registration: string | null;
  carrier: string | null;
  manufacturer: string | null;
  model: string | null;
  firstFlight: string | null;
  cn: string | null;
  airplaneName: string | null;
  flown: boolean | null;
  modelled: boolean | null;
  infoReady: boolean | null;
  readyToPublish: boolean | null;
  rating: string | null;
  age: string | null;
  url: string | null;
}

export type PhotoFolderInfoData = Data<PhotoFolderInfoAttributes>;
