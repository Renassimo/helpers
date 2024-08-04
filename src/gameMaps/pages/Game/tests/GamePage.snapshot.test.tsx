import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import PlayCards from '@/gameMaps/components/PlayCards';
import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';
import GameFormModal from '@/gameMaps/components/GameFormModal';
import PlayFormModal from '@/gameMaps/components/PlayFormModal';

import useAlerts, { useErrorAlert } from '@/common/hooks/alerts';

import MockedPlayCards from '@/gameMaps/components/PlayCards/mocks';
import MockedGameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate/mocks';
import MockedGameFormModal from '@/gameMaps/components/GameFormModal/mocks';
import MockedPlayFormModal from '@/gameMaps/components/PlayFormModal/mocks';
import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedGame, mockedPlays } from '@/gameMaps/types/mocks';

import { GamePageProps } from '@/gameMaps/types';

import GamePage from '../GamePage';

jest.mock('@/gameMaps/components/PlayCards');
jest.mock('@/gameMaps/templates/GameMapsTemplate');
jest.mock('@/common/hooks/alerts');
jest.mock('@/gameMaps/components/GameFormModal');
jest.mock('@/gameMaps/components/PlayFormModal');
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Game Page snapshot', () => {
  const mockedUseErrorAlert = jest.fn();
  const mockedCreateSuccessAlert = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createSuccessAlert: mockedCreateSuccessAlert,
  }));

  beforeEach(() => {
    (GameMapsTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedGameMapsTemplate
    );
    (PlayCards as unknown as jest.Mock).mockImplementationOnce(MockedPlayCards);
    (useErrorAlert as unknown as jest.Mock).mockImplementation(
      mockedUseErrorAlert
    );
    (GameFormModal as unknown as jest.Mock).mockImplementation(
      MockedGameFormModal
    );
    (PlayFormModal as unknown as jest.Mock).mockImplementation(
      MockedPlayFormModal
    );
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
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
    expect(mockedUseAlerts).toHaveBeenCalledWith();
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
      expect(mockedUseAlerts).toHaveBeenCalledWith();
    });
  });
});
