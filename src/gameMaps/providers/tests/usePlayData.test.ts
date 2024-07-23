import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import { PlayPageData } from '@/gameMaps/types';

import {
  mockedCategories,
  mockedGame,
  mockedItems,
  mockedPlay,
  mockedPlay2,
} from '@/gameMaps/types/mocks';

import usePlayData from '../hooks/usePlayData';

const mockedPush = jest.fn();

jest.mock('@/common/hooks/alerts');
jest.mock('@/common/utils/data');
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
  const mockedObject = {
    id: 'id1',
    attributes: { attr1: 'attr1', attr2: 'attr2' },
  };
  const mockedAttributeObjectFromArray = {
    id1: mockedObject,
  };
  const mockedGetAttributeObjectFromArray = jest.fn(
    () => mockedAttributeObjectFromArray
  );

  const mockedData: PlayPageData = {
    gameData: mockedGame,
    playData: mockedPlay,
    categoriesData: mockedCategories,
    itemsData: mockedItems,
  };

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
    (getAttributeObjectFromArray as unknown as jest.Mock).mockImplementation(
      mockedGetAttributeObjectFromArray
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expecteDefaultdState = {
    game: mockedGame,
    play: mockedPlay,
    updateSubmittedPlay: expect.any(Function),
    isPlayEditOpen: false,
    setIsPlayEditOpen: expect.any(Function),
    categories: [mockedObject],
    items: [mockedObject],
  };

  test('returns state', () => {
    // Arange
    const expectedState = expecteDefaultdState;
    // Act
    const { result } = renderHook(() => usePlayData(mockedData));
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUseAlerts).toHaveBeenCalledWith();
    expect(mockedGetAttributeObjectFromArray).toHaveBeenCalledTimes(2);
  });

  describe('when updates submitted play', () => {
    test('creates success alert and updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultdState,
        play: mockedPlay2,
      };
      const { result } = renderHook(() => usePlayData(mockedData));
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
          ...expecteDefaultdState,
          play: null,
        };
        const { result } = renderHook(() => usePlayData(mockedData));
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
        ...expecteDefaultdState,
        isPlayEditOpen: true,
      };
      const { result } = renderHook(() => usePlayData(mockedData));
      // Act
      await act(async () => {
        await result.current.setIsPlayEditOpen(true);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });
});
