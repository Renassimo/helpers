import { Avia } from '@/avia/types/avia';
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
}

export interface PhotoInfoContextState extends PhotoHandlerState {
  handlingText: string;
  photosList: PhotoInfo[];
  foldersList: PhotoFolder[];
  dispatch: (value: PhotoInfoAction) => void;
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
}

export const defaultPhotosState: PhotoHandlerState = {
  files: [],
  photos: {},
  folders: {},
  zoomedPhoto: null,
  showingFolder: null,
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
    };
