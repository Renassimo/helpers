import renderWithTheme from '@/tests/helpers';

import SpottingPage from '@/spotting/pages/Spotting';
import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';

import MockedSpottedPlanesList from '@/spotting/components/SpottedPlanesList/mocks';

import { mockedSpottedPlaneApiDataTruthy } from '@/spotting/types/mocks';
import { mockedPageInfos, mockedUser } from '@/common/types/auth/mocks';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

jest.mock('@/spotting/components/SpottedPlanesList');

describe('SpottingPage', () => {
  beforeEach(() => {
    (SpottedPlanesList as unknown as jest.Mock).mockImplementationOnce(
      MockedSpottedPlanesList
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got data', () => {
    test('renders successfully', () => {
      // Arrange
      const mockedData = [mockedSpottedPlaneApiDataTruthy];
      // Act
      const { container } = renderWithTheme(
        <SpottingPage
          user={mockedUser}
          pages={mockedPageInfos}
          data={mockedData}
          error={null}
        />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedSpottedPlanesList).toHaveBeenCalledWith({}, {});
    });
  });

  describe('when got error', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { container } = renderWithTheme(
        <SpottingPage
          user={mockedUser}
          pages={mockedPageInfos}
          data={null}
          error={mockedNotionError418}
        />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedSpottedPlanesList).toHaveBeenCalledWith({}, {});
    });
  });
});
