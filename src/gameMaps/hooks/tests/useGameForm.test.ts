import { renderHook, cleanup, act } from '@testing-library/react';

import { GameData } from '@/gameMaps/types';

import { mockedGame } from '@/gameMaps/types/mocks';
import { FileWithPreview } from '@/common/types/files';

import useGameForm from '../useGameForm';

describe('useGameForm', () => {
  const mockedData: GameData = mockedGame;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const mockedFileWithPreview = new File([], 'file') as FileWithPreview;

  const expectedFilledValues = {
    title: mockedGame.attributes.title,
    description: mockedGame.attributes.description,
    backgroundColor: mockedGame.attributes.backgroundColor,
    mapImageUrl: mockedGame.attributes.mapImageUrl,
    mapImage: mockedFileWithPreview,
  };

  const expectedEmptyValues = {
    title: '',
    description: '',
    backgroundColor: '',
    mapImageUrl: '',
    mapImage: null,
  };

  const expectedEmptyState = {
    prepareFormForEdit: expect.any(Function),
    cleanForm: expect.any(Function),
    isEditForm: false,
    onSubmit: expect.any(Function),
    values: expectedEmptyValues,
    setters: {
      setTitle: expect.any(Function),
      setDescription: expect.any(Function),
      setBackgroundColor: expect.any(Function),
      setMapImageUrl: expect.any(Function),
      setMapImage: expect.any(Function),
    },
  };

  const setValues = async (setters: Record<string, any>) => {
    await setters.setBackgroundColor(mockedGame.attributes.backgroundColor);
    await setters.setDescription(mockedGame.attributes.description);
    await setters.setTitle(mockedGame.attributes.title);
    await setters.setMapImageUrl(mockedGame.attributes.mapImageUrl);
    await setters.setMapImage(mockedFileWithPreview);
  };

  test('returns empty game form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useGameForm());
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
  });

  describe('When prepares form for edit without data', () => {
    test('returns empty game form state', async () => {
      // Arange
      const { result } = renderHook(() => useGameForm());
      // Act
      await act(async () => {
        await result.current.prepareFormForEdit();
      });
      // Assert
      expect(result.current).toEqual(expectedEmptyState);
    });
  });

  describe('When setters called', () => {
    test('returns updated game form state', async () => {
      // Arange
      const { result } = renderHook(() => useGameForm());
      // Act
      await act(async () => {
        await setValues(result.current.setters);
      });
      // Assert
      expect(result.current).toEqual({
        ...expectedEmptyState,
        values: expectedFilledValues,
      });
    });
  });

  describe.skip('When form was submitted', () => {
    test('calls onSubmit', () => {
      // Arange
      // Act
      // Assert
    });
  });

  describe('when data passed', () => {
    describe('When prepares form for edit', () => {
      test('returns updated game form state', async () => {
        // Arange
        const { result } = renderHook(() => useGameForm(mockedData));
        // Act
        await act(async () => {
          await result.current.prepareFormForEdit();
        });
        // Assert
        expect(result.current).toEqual({
          ...expectedEmptyState,
          isEditForm: true,
          values: { ...expectedFilledValues, mapImage: null },
        });
      });
    });

    describe('When form is cleaned', () => {
      test('returns updated empty game form state', async () => {
        // Arange
        const { result } = renderHook(() => useGameForm(mockedData));
        // Act
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.cleanForm();
        });
        // Assert
        expect(result.current).toEqual({
          ...expectedEmptyState,
          isEditForm: true,
        });
      });
    });

    describe.skip('When form was submitted', () => {
      test('calls onSubmit', () => {
        // Arange
        // Act
        // Assert
      });
    });
  });
});
