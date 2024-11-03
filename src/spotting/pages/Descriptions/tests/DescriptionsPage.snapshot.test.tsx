import renderWithTheme from '@/common/tests/helpers';

import DescriptionsPage from '@/spotting/pages/Descriptions';
import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';
import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

import MockedPageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs/mocks';
import MockedSpottedPlanesList from '@/spotting/components/SpottedPlanesList/mocks';

import { mockedSpottedPlaneApiDataTruthy } from '@/spotting/types/mocks';
import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

jest.mock('@/spotting/components/SpottedPlanesList');
jest.mock('@/common/templates/PageTemplateWithBreadcrumbs');

describe('DescriptionsPage', () => {
  beforeEach(() => {
    (SpottedPlanesList as unknown as jest.Mock).mockImplementationOnce(
      MockedSpottedPlanesList
    );
    (
      PageTemplateWithBreadcrumbs as unknown as jest.Mock
    ).mockImplementationOnce(MockedPageTemplateWithBreadcrumbs);
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
        <DescriptionsPage
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
        <DescriptionsPage
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
