import { useReducer } from 'react';

import { defaultPhotosState } from '@/spotting/types';

import photoInfoReducer from './photoInfoReducer';

const usePhotoInfoReducer = () =>
  useReducer(photoInfoReducer, defaultPhotosState);

export default usePhotoInfoReducer;
