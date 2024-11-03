import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import SimpleModal from '@/common/components/Modal/SimpleModal';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import PhotoFolderPhotos from '@/spotting/components/PhotoInfoHandler/components/PhotoFolderPhotos';
import PhotoFolderForm from '@/spotting/components/PhotoInfoHandler/components/PhotoFolderForm';

import MockedModal from '@/common/components/Modal/mocks';
import { mockedPhotoFolder } from '@/spotting/types/mocks';
import MockedPhotoFolderPhotos from '@/spotting/components/PhotoInfoHandler/components/PhotoFolderPhotos/mocks';
import MockedPhotoFolderForm from '@/spotting/components/PhotoInfoHandler/components/PhotoFolderForm/mocks';

import PhotoFolderModal from '../PhotoFolderModal';

jest.mock('@/common/components/Modal/SimpleModal');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock(
  '@/spotting/components/PhotoInfoHandler/components/PhotoFolderPhotos'
);
jest.mock('@/spotting/components/PhotoInfoHandler/components/PhotoFolderForm');

describe('PhotoFolderModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (SimpleModal as unknown as jest.Mock).mockImplementation(MockedModal);
    (PhotoFolderPhotos as unknown as jest.Mock).mockImplementation(
      MockedPhotoFolderPhotos
    );
    (PhotoFolderForm as unknown as jest.Mock).mockImplementation(
      MockedPhotoFolderForm
    );
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ dispatch, showingFolder: null }))
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoFolderModal />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when photoFolder chosen', () => {
    beforeEach(() => {
      (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ dispatch, showingFolder: mockedPhotoFolder }))
      );
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<PhotoFolderModal />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
