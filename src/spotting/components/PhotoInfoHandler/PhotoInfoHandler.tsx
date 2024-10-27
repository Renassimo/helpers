import Box from '@mui/material/Box';

import PhotoDropZone from './components/PhotoDropZone';
import PhotoPlaceForm from './components/PhotoPlaceForm';
import PhotoFoldersList from './components/PhotoFoldersList';
import PhotoInfoActions from './components/PhotoInfoActions';
import PhotosList from './components/PhotosList';
import PhotoZoomModal from './components/PhotoZoomModal';
import PhotoFolderModal from './components/PhotoFolderModal';

const PhotoInfoHandler = () => (
  <Box>
    <PhotoDropZone />
    <PhotoPlaceForm />
    <PhotoFoldersList />
    <PhotoInfoActions />
    <PhotosList />
    <PhotoZoomModal />
    <PhotoFolderModal />
  </Box>
);

export default PhotoInfoHandler;
