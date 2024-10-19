import { ReactNode } from 'react';

import usePhotoInfoProvider from './hooks/usePhotoInfoProvider';
import PhotoInfoContext from '../contexts/PhotoInfoContext';

const PhotoInfoProvider = ({ children }: { children: ReactNode }) => {
  const photoInfoData = usePhotoInfoProvider();

  return (
    <PhotoInfoContext.Provider value={photoInfoData}>
      {children}
    </PhotoInfoContext.Provider>
  );
};

export default PhotoInfoProvider;
