import renderWithTheme from '@/common/tests/helpers';

import SpottingPage from '@/spotting/pages/Spotting';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import MockedPageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs/mocks';

jest.mock('@/spotting/components/SpottedPlanesList');
jest.mock('@/common/templates/PageTemplateWithBreadcrumbs');

describe('SpottingPage', () => {
  beforeEach(() => {
    (
      PageTemplateWithBreadcrumbs as unknown as jest.Mock
    ).mockImplementationOnce(MockedPageTemplateWithBreadcrumbs);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arrange
    // Act
    const { container } = renderWithTheme(
      <SpottingPage user={mockedUser} pages={mockedPageInfos} />
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
