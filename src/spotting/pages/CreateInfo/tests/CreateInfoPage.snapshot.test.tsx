import renderWithTheme from '@/common/tests/helpers';

import CreateInfoPage from '@/spotting/pages/CreateInfo';
import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

import MockedPageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs/mocks';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';

jest.mock('@/common/templates/PageTemplateWithBreadcrumbs');

describe('CreateInfoPage', () => {
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
      <CreateInfoPage user={mockedUser} pages={mockedPageInfos} />
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
