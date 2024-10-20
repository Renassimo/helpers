import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import userEvent from '@testing-library/user-event';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import { PhotoActionType } from '@/spotting/types';

import MockedPhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard/mocks';
import { mockedPhotoFolder } from '@/spotting/types/mocks';

import PhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard';

import PhotoFolderPhotos from '../PhotoFolderPhotos';

jest.mock('@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');

describe('PhotoFolderPhotos', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (PhotoInfoCard as unknown as jest.Mock).mockImplementation(
      MockedPhotoInfoCard
    );
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ dispatch, showingFolder: null }))
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoFolderPhotos />);
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
      const { baseElement } = renderWithTheme(<PhotoFolderPhotos />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when Remove folder clicked', () => {
      test('calls dispatch', async () => {
        // Arange
        const { getByText } = renderWithTheme(<PhotoFolderPhotos />);
        // Act
        await userEvent.click(getByText('Remove folder'));
        // Assert
        expect(dispatch).toBeCalledWith({
          type: PhotoActionType.REMOVE_FOLDER,
          payload: mockedPhotoFolder.id,
        });
      });
    });
  });
});
