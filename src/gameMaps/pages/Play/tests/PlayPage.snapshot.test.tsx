import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';

import { PlayPageProps } from '@/gameMaps/types';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';

import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';
import Play from '@/gameMaps/components/Play';

import MockedGameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate/mocks';
import MockedPlay from '@/gameMaps/components/Play/mocks';
import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

import PlayPage from '../PlayPage';

jest.mock('@/gameMaps/templates/GameMapsTemplate');
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
    (GameMapsTemplate as unknown as jest.Mock).mockImplementation(
      MockedGameMapsTemplate
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
