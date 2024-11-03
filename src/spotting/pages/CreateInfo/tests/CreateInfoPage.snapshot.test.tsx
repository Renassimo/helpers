import renderWithTheme from '@/common/tests/helpers';

import CreateInfoPage from '@/spotting/pages/CreateInfo';
import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

import PhotoHandler from '@/spotting/components/PhotoInfoHandler';
import PhotoInfoProvider from '@/spotting/providers/PhotoInfoProvider';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import MockedPageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs/mocks';
import MockedPhotoInfoProvider from '@/spotting/providers/mocks/MockedPhotoInfoProvider';
import MockedPhotoInfoHandler from '@/spotting/components/PhotoInfoHandler/mocks/MockedPhotoInfoHandler';

jest.mock('@/common/templates/PageTemplateWithBreadcrumbs');
jest.mock('@/spotting/components/PhotoInfoHandler');
jest.mock('@/spotting/providers/PhotoInfoProvider');

describe('CreateInfoPage', () => {
  beforeEach(() => {
    (
      PageTemplateWithBreadcrumbs as unknown as jest.Mock
    ).mockImplementationOnce(MockedPageTemplateWithBreadcrumbs);
    (PhotoInfoProvider as unknown as jest.Mock).mockImplementationOnce(
      MockedPhotoInfoProvider
    );
    (PhotoHandler as unknown as jest.Mock).mockImplementationOnce(
      MockedPhotoInfoHandler
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <CreateInfoPage user={mockedUser} pages={mockedPageInfos} />
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
