import { useContext } from 'react';

import PhotoInfoContext from '@/spotting/contexts/PhotoInfoContext';

const usePhotoInfoContext = () => useContext(PhotoInfoContext);

export default usePhotoInfoContext;
