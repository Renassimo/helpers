import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';
import PhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard';

import { mockedPhotosList } from '@/spotting/types/mocks';
import MockedPhotoInfoCard from '@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard/mocks';

import PhotosList from '../PhotosList';

jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('@/spotting/components/PhotoInfoHandler/components/PhotoInfoCard');

describe('PhotosList', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ dispatch, photosList: mockedPhotosList }))
    );
    (PhotoInfoCard as unknown as jest.Mock).mockImplementation(
      MockedPhotoInfoCard
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotosList />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
