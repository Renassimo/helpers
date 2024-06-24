import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import PlayCards from '@/gameMaps/components/PlayCards';
import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';

import useErrorAlert from '@/common/hooks/alerts/useErrorAlert';

import MockedPlayCards from '@/gameMaps/components/PlayCards/mocks';
import MockedGameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate/mocks';

import { GamePageProps } from '@/gameMaps/types';
import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedGame, mockedPlays } from '@/gameMaps/types/mocks';

import GamePage from '../GamePage';

jest.mock('@/gameMaps/components/PlayCards');
jest.mock('@/gameMaps/templates/GameMapsTemplate');
jest.mock('@/common/hooks/alerts/useErrorAlert');

describe('Game Page snapshot', () => {
  const mockedUseErrorAlert = jest.fn();

  beforeEach(() => {
    (GameMapsTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedGameMapsTemplate
    );
    (PlayCards as unknown as jest.Mock).mockImplementationOnce(MockedPlayCards);
    (useErrorAlert as unknown as jest.Mock).mockImplementation(
      mockedUseErrorAlert
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    const mockedProps: GamePageProps = {
      user: mockedUser,
      pages: mockedPageInfos,
      data: {
        gameData: mockedGame,
        playsData: mockedPlays,
      },
      error: null,
    };
    // Act
    const { container } = renderWithTheme(<GamePage {...mockedProps} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(mockedUseErrorAlert).toHaveBeenCalledWith(null);
  });

  describe('when got an error', () => {
    test('renders successfully', () => {
      // Arange
      const mockedError = { message: 'Error' };
      const mockedProps: GamePageProps = {
        user: mockedUser,
        pages: mockedPageInfos,
        data: null,
        error: mockedError,
      };
      // Act
      const { container } = renderWithTheme(<GamePage {...mockedProps} />);
      // Assert
      expect(container).toMatchSnapshot();
      expect(mockedUseErrorAlert).toHaveBeenCalledWith(mockedError);
    });
  });
});
