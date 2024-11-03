import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import SimpleModal from '@/common/components/Modal/SimpleModal';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import MockedModal from '@/common/components/Modal/mocks';
import { mockedPhoto } from '@/spotting/types/mocks';

import PhotoZoomModal from '../PhotoZoomModal';

jest.mock('@/common/components/Modal/SimpleModal');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');

describe('PhotoZoomModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (SimpleModal as unknown as jest.Mock).mockImplementation(MockedModal);
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ dispatch, zoomedPhoto: mockedPhoto }))
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoZoomModal />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
