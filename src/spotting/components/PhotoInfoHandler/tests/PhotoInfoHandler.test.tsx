import PhotoDropZone from './../components/PhotoDropZone';
import PhotoPlaceForm from './../components/PhotoPlaceForm';
import PhotoFoldersList from './../components/PhotoFoldersList';
import PhotoInfoActions from './../components/PhotoInfoActions';
import PhotosList from './../components/PhotosList';
import PhotoZoomModal from './../components/PhotoZoomModal';
import PhotoFolderModal from './../components/PhotoFolderModal';

import MockedPhotoDropZone from '../components/PhotoDropZone/mocks';
import MockedPhotoPlaceForm from '../components/PhotoPlaceForm/mocks';
import MockedPhotoFoldersList from '../components/PhotoFoldersList/mocks';
import MockedPhotoInfoActions from '../components/PhotoInfoActions/mocks';
import MockedPhotosList from '../components/PhotosList/mocks';
import MockedPhotoZoomModal from '../components/PhotoZoomModal/mocks';
import MockedPhotoFolderModal from '../components/PhotoFolderModal/mocks';

import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import PhotoInfoHandler from '../PhotoInfoHandler';

jest.mock('./../components/PhotoDropZone');
jest.mock('./../components/PhotoPlaceForm');
jest.mock('./../components/PhotoFoldersList');
jest.mock('./../components/PhotoInfoActions');
jest.mock('./../components/PhotosList');
jest.mock('./../components/PhotoZoomModal');
jest.mock('./../components/PhotoFolderModal');

describe('PhotoInfoHandler', () => {
  beforeEach(() => {
    (PhotoPlaceForm as unknown as jest.Mock).mockImplementation(
      MockedPhotoDropZone
    );
    (PhotoDropZone as unknown as jest.Mock).mockImplementation(
      MockedPhotoPlaceForm
    );
    (PhotoFoldersList as unknown as jest.Mock).mockImplementation(
      MockedPhotoFoldersList
    );
    (PhotoInfoActions as unknown as jest.Mock).mockImplementation(
      MockedPhotoInfoActions
    );
    (PhotosList as unknown as jest.Mock).mockImplementation(MockedPhotosList);
    (PhotoZoomModal as unknown as jest.Mock).mockImplementation(
      MockedPhotoZoomModal
    );
    (PhotoFolderModal as unknown as jest.Mock).mockImplementation(
      MockedPhotoFolderModal
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoInfoHandler />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
