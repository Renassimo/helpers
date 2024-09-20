import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';

import { PlayPageProps } from '@/gameMaps/types';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';
import Play from '@/gameMaps/components/Play';

import MockedPageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs/mocks';
import MockedPlay from '@/gameMaps/components/Play/mocks';
import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

import PlayPage from '../PlayPage';

jest.mock('@/common/templates/PageTemplateWithBreadcrumbs');
jest.mock('@/gameMaps/components/Play');
jest.mock('@/gameMaps/contexts/hooks/usePlayContext');

describe('Game Page snapshot', () => {
  const mockedSetIsPlayEditOpen = jest.fn();
  const mockedUsePlayContext = jest.fn(() => ({
    game: mockedGame,
    play: mockedPlay,
    setIsPlayEditOpen: mockedSetIsPlayEditOpen,
  }));

  beforeEach(() => {
    (PageTemplateWithBreadcrumbs as unknown as jest.Mock).mockImplementation(
      MockedPageTemplateWithBreadcrumbs
    );
    (Play as unknown as jest.Mock).mockImplementation(MockedPlay);
    (usePlayContext as unknown as jest.Mock).mockImplementation(
      mockedUsePlayContext
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    const mockedProps: Partial<PlayPageProps> = {
      user: mockedUser,
      pages: mockedPageInfos,
    };
    // Act
    const { container } = renderWithTheme(<PlayPage {...mockedProps} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(MockedPlay).toHaveBeenCalledWith({}, {});
    expect(mockedUsePlayContext).toHaveBeenCalledWith();
  });
});
