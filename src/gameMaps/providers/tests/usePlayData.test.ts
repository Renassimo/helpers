import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import { mockedGame, mockedPlay, mockedPlay2 } from '@/gameMaps/types/mocks';

import usePlayData from '../hooks/subhooks/usePlayData';

const mockedPush = jest.fn();

jest.mock('@/common/hooks/alerts');
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockedPush,
  })),
}));

describe('usePlayData', () => {
  const mockedCreateSuccessAlert = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createSuccessAlert: mockedCreateSuccessAlert,
  }));

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expecteDefaultState = {
    play: mockedPlay,
    updateSubmittedPlay: expect.any(Function),
    isPlayEditOpen: false,
    setIsPlayEditOpen: expect.any(Function),
  };

  test('returns state', () => {
    // Arange
    const expectedState = expecteDefaultState;
    // Act
    const { result } = renderHook(() => usePlayData(mockedGame, mockedPlay));
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUseAlerts).toHaveBeenCalledWith();
  });

  describe('when updates submitted play', () => {
    test('creates success alert and updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        play: mockedPlay2,
      };
      const { result } = renderHook(() => usePlayData(mockedGame, mockedPlay));
      // Act
      await act(async () => {
        await result.current.updateSubmittedPlay(mockedPlay2);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
      expect(mockedPush).not.toHaveBeenCalled();
      expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
        `"${mockedPlay2.attributes.title}" play was updated!`
      );
    });

    describe('when play is data', () => {
      test('creates success alert and updates state', async () => {
        // Arange
        const expectedState = {
          ...expecteDefaultState,
          play: null,
        };
        const { result } = renderHook(() =>
          usePlayData(mockedGame, mockedPlay)
        );
        // Act
        await act(async () => {
          await result.current.updateSubmittedPlay(null);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
        expect(mockedPush).toHaveBeenCalledWith(
          `/gameMaps/games/${mockedGame?.id}`
        );
        expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
          `Play was deleted!`
        );
      });
    });
  });

  describe('when calls setIsPlayEditOpen', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isPlayEditOpen: true,
      };
      const { result } = renderHook(() => usePlayData(mockedGame, mockedPlay));
      // Act
      await act(async () => {
        await result.current.setIsPlayEditOpen(true);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });
});
