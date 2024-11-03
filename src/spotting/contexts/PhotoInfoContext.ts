import { createContext } from 'react';
import { defaultPhotosState, PhotoInfoContextState } from '@/spotting/types';

const PhotoInfoContext = createContext<PhotoInfoContextState>({
  handlingText: '',
  photosList: [],
  foldersList: [],
  dispatch: () => {},
  options: null,
  matchers: null,
  updateMatchers: () => Promise.resolve(),
  ...defaultPhotosState,
});

export default PhotoInfoContext;
