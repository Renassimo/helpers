import { uid } from 'uid';
import {
  PhotoHandlerState,
  PhotoInfoAction,
  PhotoActionType,
  PhotoInfosState,
  PhotoFoldersState,
  PhotoFolder,
} from '@/spotting/types';

const photoInfoReducer = (
  state: PhotoHandlerState,
  action: PhotoInfoAction
): PhotoHandlerState => {
  const bulkSelection = (selected: boolean) => {
    const updatedPhotos: PhotoInfosState = {};
    const { photos } = state;
    for (const key in photos) {
      updatedPhotos[key] = { ...photos[key], selected };
    }
    return updatedPhotos;
  };

  switch (action.type) {
    case PhotoActionType.FILES_DROP: {
      return {
        ...state,
        files: [...state.files, ...action.payload],
      };
    }
    case PhotoActionType.ADD_PHOTO: {
      const { payload } = action;
      return {
        ...state,
        photos: {
          ...state.photos,
          [payload.path]: payload,
        },
      };
    }
    case PhotoActionType.CLEAR_FILES: {
      return {
        ...state,
        files: [],
      };
    }
    case PhotoActionType.SELECT_ALL: {
      return {
        ...state,
        photos: bulkSelection(true),
      };
    }
    case PhotoActionType.UNSELECT_ALL: {
      return {
        ...state,
        photos: bulkSelection(false),
      };
    }
    case PhotoActionType.SELECT: {
      const path = action.payload;
      const photo = state.photos[path];
      const updatedPhoto = { ...photo, selected: !photo.selected };
      return {
        ...state,
        photos: {
          ...state.photos,
          [path]: updatedPhoto,
        },
      };
    }
    case PhotoActionType.SET_ZOOMED_PHOTO: {
      return {
        ...state,
        zoomedPhoto:
          state.photos[action.payload] ||
          state.showingFolder?.photos[action.payload] ||
          null,
      };
    }
    case PhotoActionType.CLEAR_ZOOMED_PHOTO: {
      return {
        ...state,
        zoomedPhoto: null,
      };
    }
    case PhotoActionType.CREATE_FOLDER: {
      const { photos } = state;
      const folderPhotos: PhotoInfosState = {};
      const updatedPhotos: PhotoInfosState = {};

      for (const path in photos) {
        const photo = photos[path];
        if (!photo) continue;
        if (photo.selected) folderPhotos[path] = { ...photo, selected: false };
        else updatedPhotos[path] = photo;
      }

      const id = uid(6);

      return {
        ...state,
        folders: {
          ...state.folders,
          [id]: { photos: folderPhotos, id, attributes: {} },
        },
        photos: updatedPhotos,
      };
    }
    case PhotoActionType.SET_FOLDER_MODAL: {
      return {
        ...state,
        showingFolder: state.folders[action.payload] || null,
      };
    }
    case PhotoActionType.CLEAR_FOLDER_MODAL: {
      return {
        ...state,
        showingFolder: null,
      };
    }
    case PhotoActionType.REMOVE_FROM_FOLDER: {
      const path = action.payload;
      const { showingFolder, folders } = state;

      if (!showingFolder) return state;
      const photo = showingFolder.photos[path];
      const folderId = showingFolder.id;

      let updatedFolder: PhotoFolder | null = { ...showingFolder };
      updatedFolder.photos = {};
      const photos = { ...state.photos };

      // removes photo from showing folder
      for (const photoPath in showingFolder.photos) {
        if (photoPath === path) {
          continue;
        } else {
          updatedFolder.photos[photoPath] = showingFolder.photos[photoPath];
        }
      }
      if (Object.keys(updatedFolder.photos).length === 0) updatedFolder = null;
      // adds photo to photos
      photos[path] = photo;

      // updates folders
      const updatedFolders: PhotoFoldersState = {};
      for (const id in folders) {
        const folder = folders[id];

        if (folder.id === folderId && updatedFolder) {
          updatedFolders[id] = updatedFolder;
        } else {
          updatedFolders[id] = folder;
        }
      }

      return {
        ...state,
        showingFolder: updatedFolder,
        photos,
        folders: updatedFolders,
      };
    }
    case PhotoActionType.REMOVE_FOLDER: {
      const id = action.payload;

      const { photos } = state.folders[id];

      const updatedFolders: PhotoFoldersState = {};

      for (const folderId in state.folders) {
        if (id !== folderId) updatedFolders[folderId] = state.folders[folderId];
      }

      return {
        ...state,
        photos: { ...state.photos, ...photos },
        showingFolder: null,
        folders: updatedFolders,
      };
    }
    case PhotoActionType.UPDATE_PLACE: {
      const place = action.payload || null;

      return {
        ...state,
        place,
      };
    }
    case PhotoActionType.SAVE_FOLDER_INFO: {
      const attributes = action.payload;
      const { showingFolder } = state;
      if (!showingFolder) return state;

      const updatedFolder = { ...showingFolder, attributes };

      return {
        ...state,
        showingFolder: null,
        folders: {
          ...state.folders,
          [updatedFolder.id]: updatedFolder,
        },
      };
    }
  }
};

export default photoInfoReducer;
