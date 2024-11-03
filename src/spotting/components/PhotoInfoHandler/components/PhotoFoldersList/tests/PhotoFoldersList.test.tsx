import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import PhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard';

import { mockedPhotoFoldersList } from '@/spotting/types/mocks';
import MockedPhotoInfoCard from '../../PhotoInfoCard/mocks';

import PhotoFoldersList from '../PhotoFoldersList';

jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard');

describe('PhotoFoldersList', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ dispatch, foldersList: mockedPhotoFoldersList }))
    );
    (PhotoInfoCard as unknown as jest.Mock).mockImplementation(
      jest.fn(() => MockedPhotoInfoCard)
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoFoldersList />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
