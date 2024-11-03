import {
  defaultPhotosState,
  PhotoHandlerState,
  PhotoInfo,
  PhotoInfoAction,
  PhotoActionType,
} from '@/spotting/types';

import { FileWithPath } from 'react-dropzone';
import { uid } from 'uid';

import photoInfoReducer from '../hooks/usePhotoInfoReducer/photoInfoReducer';

jest.mock('uid');

describe('photoInfoReducer when action is', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const file1 = { path: 'path1' } as FileWithPath;
  const file2 = { path: 'path2' } as FileWithPath;
  const file3 = { path: 'path3' } as FileWithPath;
  const file4 = { path: 'path4' } as FileWithPath;
  const file5 = { path: 'path5' } as FileWithPath;
  const file6 = { path: 'path6' } as FileWithPath;
  const file7 = { path: 'path7' } as FileWithPath;
  const file8 = { path: 'path8' } as FileWithPath;
  const file9 = { path: 'path9' } as FileWithPath;

  const files = [file1, file2, file3, file4, file5, file6, file7, file8, file9];

  const photo1 = { path: 'path1' } as PhotoInfo;
  const photo2 = { path: 'path2' } as PhotoInfo;
  const photo3 = { path: 'path3' } as PhotoInfo;
  const photo4 = { path: 'path4' } as PhotoInfo;
  const photo5 = { path: 'path5' } as PhotoInfo;
  const photo6 = { path: 'path6' } as PhotoInfo;
  const photo7 = { path: 'path7' } as PhotoInfo;
  const photo8 = { path: 'path8' } as PhotoInfo;

  const photos = {
    [photo6.path]: { ...photo6, selected: true },
    [photo7.path]: { ...photo7, selected: false },
    [photo8.path]: photo8,
  };

  const folder1 = {
    id: 'folder1',
    photos: {
      [photo1.path]: photo1,
      [photo2.path]: photo2,
    },
    place: null,
  };
  const folder2 = {
    id: 'folder2',
    photos: {
      [photo3.path]: photo3,
      [photo4.path]: photo4,
      [photo5.path]: photo5,
    },
    place: null,
  };

  const folders = {
    [folder1.id]: folder1,
    [folder2.id]: folder2,
  };

  const state = {
    ...defaultPhotosState,
    files,
    photos,
    folders,
  };

  const getTest =
    (
      action: PhotoInfoAction,
      currentStateFragment?: Partial<PhotoHandlerState>,
      expectedStateFragment?: Partial<PhotoHandlerState>
    ) =>
    () => {
      expect(
        photoInfoReducer({ ...state, ...(currentStateFragment || {}) }, action)
      ).toEqual({
        ...state,
        ...(expectedStateFragment || {}),
      });
    };

  describe('FILES_DROP', () => {
    const newFile1 = { path: 'new-path1' } as FileWithPath;
    const newFile2 = { path: 'new-path2' } as FileWithPath;

    test(
      'adds new files to state',
      getTest(
        { type: PhotoActionType.FILES_DROP, payload: [newFile1, newFile2] },
        {},
        {
          files: [...state.files, newFile1, newFile2],
        }
      )
    );
  });

  describe('ADD_PHOTO', () => {
    const newPhoto1 = { path: 'newPath1' } as PhotoInfo;

    test(
      'adds new photos to state',
      getTest(
        { type: PhotoActionType.ADD_PHOTO, payload: newPhoto1 },
        {},
        {
          photos: { ...state.photos, [newPhoto1.path]: newPhoto1 },
        }
      )
    );
  });

  describe('CLEAR_FILES', () => {
    test(
      'clears all files from state',
      getTest(
        { type: PhotoActionType.CLEAR_FILES },
        {},
        {
          ...defaultPhotosState,
        }
      )
    );
  });

  describe('SELECT_ALL', () => {
    test(
      'selects all photos',
      getTest(
        { type: PhotoActionType.SELECT_ALL },
        {},
        {
          photos: {
            [photo6.path]: { ...photo6, selected: true },
            [photo7.path]: { ...photo7, selected: true },
            [photo8.path]: { ...photo8, selected: true },
          },
        }
      )
    );
  });

  describe('UNSELECT_ALL', () => {
    test(
      'unselects all photos',
      getTest(
        { type: PhotoActionType.UNSELECT_ALL },
        {},
        {
          photos: {
            [photo6.path]: { ...photo6, selected: false },
            [photo7.path]: { ...photo7, selected: false },
            [photo8.path]: { ...photo8, selected: false },
          },
        }
      )
    );
  });

  describe('SELECT', () => {
    test(
      'selects photo',
      getTest(
        { type: PhotoActionType.SELECT, payload: photo8.path },
        {},
        {
          photos: {
            ...photos,
            [photo8.path]: { ...photo8, selected: true },
          },
        }
      )
    );
  });

  describe('SET_ZOOMED_PHOTO', () => {
    test(
      'sets zoomed photo',
      getTest(
        { type: PhotoActionType.SET_ZOOMED_PHOTO, payload: photo8.path },
        {},
        {
          zoomedPhoto: photo8,
        }
      )
    );

    describe('when sets photos from folder', () => {
      test(
        'sets zoomed photos',
        getTest(
          { type: PhotoActionType.SET_ZOOMED_PHOTO, payload: photo1.path },
          { showingFolder: folder1 },
          {
            showingFolder: folder1,
            zoomedPhoto: photo1,
          }
        )
      );
    });
  });

  describe('CLEAR_ZOOMED_PHOTO', () => {
    test(
      'clears zoomed photo',
      getTest(
        { type: PhotoActionType.CLEAR_ZOOMED_PHOTO },
        {
          zoomedPhoto: photo8,
        },
        {
          zoomedPhoto: null,
        }
      )
    );
  });

  describe('CREATE_FOLDER', () => {
    (uid as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => 'folder3')
    );

    test(
      'creates folder from selected photos',
      getTest(
        { type: PhotoActionType.CREATE_FOLDER },
        {
          photos: {
            ...photos,
            [photo7.path]: { ...photo7, selected: true },
          },
        },
        {
          folders: {
            ...folders,
            folder3: {
              id: 'folder3',
              photos: {
                [photo6.path]: { ...photo6, selected: false },
                [photo7.path]: { ...photo7, selected: false },
              },
            },
          },
          photos: {
            [photo8.path]: photo8,
          },
        }
      )
    );
  });

  describe('SET_FOLDER_MODAL', () => {
    test(
      'sets folder modal',
      getTest(
        { type: PhotoActionType.SET_FOLDER_MODAL, payload: folder1.id },
        {},
        {
          showingFolder: folder1,
        }
      )
    );
  });

  describe('CLEAR_FOLDER_MODAL', () => {
    test(
      'clears folder modal',
      getTest(
        { type: PhotoActionType.CLEAR_FOLDER_MODAL },
        {
          showingFolder: folder1,
        },
        {
          showingFolder: null,
        }
      )
    );
  });

  describe('REMOVE_FROM_FOLDER', () => {
    test(
      'moves photo from folder to all photos',
      getTest(
        { type: PhotoActionType.REMOVE_FROM_FOLDER, payload: photo3.path },
        {
          showingFolder: folder2,
        },
        {
          photos: {
            [photo3.path]: photo3,
            ...photos,
          },
          folders: {
            ...folders,
            [folder2.id]: {
              ...folder2,
              photos: {
                [photo4.path]: photo4,
                [photo5.path]: photo5,
              },
            },
          },
          showingFolder: {
            ...folder2,
            photos: {
              [photo4.path]: photo4,
              [photo5.path]: photo5,
            },
          },
        }
      )
    );
  });

  describe('REMOVE_FOLDER', () => {
    test(
      'removes folder and moves photos from folder to all photos',
      getTest(
        { type: PhotoActionType.REMOVE_FOLDER, payload: folder1.id },
        {},
        {
          photos: {
            [photo1.path]: photo1,
            [photo2.path]: photo2,
            ...photos,
          },
          folders: {
            [folder2.id]: folder2,
          },
        }
      )
    );
  });

  describe('UPDATE_PLACE', () => {
    test(
      'updates place value',
      getTest(
        { type: PhotoActionType.UPDATE_PLACE, payload: 'WAW/EPWA' },
        {},
        {
          place: 'WAW/EPWA',
        }
      )
    );
  });

  describe('SAVE_FOLDER_INFO', () => {
    test(
      'saves attributes and closes modal',
      getTest(
        {
          type: PhotoActionType.SAVE_FOLDER_INFO,
          payload: {
            place: 'WAW/EPWA',
            model: 'A320neo',
            carrier: 'Airbus',
            registration: 'SP-ABC',
          },
        },
        {
          showingFolder: folder1,
        },
        {
          showingFolder: null,
          folders: {
            ...folders,
            [folder1.id]: {
              ...folder1,
              attributes: {
                place: 'WAW/EPWA',
                model: 'A320neo',
                carrier: 'Airbus',
                registration: 'SP-ABC',
                title: 'Airbus A320neo SP-ABC',
              },
            },
          },
        }
      )
    );
  });

  describe('UPDATE_MATCHERS', () => {
    test(
      'updates place value',
      getTest(
        {
          type: PhotoActionType.UPDATE_MATCHERS,
          payload: {
            airlines: { airline1: 'Airline1' },
            airports: { airport1: 'Airport1' },
            manufacturers: {
              manufacturer1: 'Manufacturer1',
              manufacturer3: 'Manufacturer3',
            },
            models: {},
          },
        },
        {
          newMatchers: {
            airlines: {},
            airports: { airport1: 'Airport1' },
            manufacturers: {
              manufacturer1: 'Manufacturer1',
              manufacturer2: 'Manufacturer2',
            },
            models: {},
          },
        },
        {
          newMatchers: {
            airlines: { airline1: 'Airline1' },
            airports: { airport1: 'Airport1' },
            manufacturers: {
              manufacturer1: 'Manufacturer1',
              manufacturer2: 'Manufacturer2',
              manufacturer3: 'Manufacturer3',
            },
            models: {},
          },
        }
      )
    );
  });
});
