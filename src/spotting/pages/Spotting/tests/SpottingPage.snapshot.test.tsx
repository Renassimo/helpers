import renderWithTheme from '@/common/tests/helpers';

import SpottingPage from '@/spotting/pages/Spotting';
import PageTemplate from '@/common/templates/PageTemplate';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';

jest.mock('@/spotting/components/SpottedPlanesList');
jest.mock('@/common/templates/PageTemplate');

describe('SpottingPage', () => {
  beforeEach(() => {
    (PageTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedPageTemplate
    );
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
