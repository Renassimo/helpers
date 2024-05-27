import renderWithTheme from '@/common/tests/helpers';

import SpottingPage from '@/spotting/pages/Spotting';
import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';
import PageTemplate from '@/common/templates/PageTemplate';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import MockedSpottedPlanesList from '@/spotting/components/SpottedPlanesList/mocks';
import { mockedSpottedPlaneApiDataTruthy } from '@/spotting/types/mocks';
import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

jest.mock('@/spotting/components/SpottedPlanesList');
jest.mock('@/common/templates/PageTemplate');

describe('SpottingPage', () => {
  beforeEach(() => {
    (SpottedPlanesList as unknown as jest.Mock).mockImplementationOnce(
      MockedSpottedPlanesList
    );
    (PageTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedPageTemplate
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
