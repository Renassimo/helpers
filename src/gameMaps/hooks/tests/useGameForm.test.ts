import { renderHook, cleanup, act } from '@testing-library/react';

import { GameData } from '@/gameMaps/types';

import useErrors from '@/common/hooks/useErrors';

import GameValidator from '@/gameMaps/validators/game';
import { validate } from '@/common/utils/validators';
import { updateImageRatio } from '@/common/utils/files';

import uploadFile from '@/common/lib/firebase/utils/uploadFile';
import deleteFile from '@/common/lib/firebase/utils/deleteFile';

import createGame from '@/gameMaps/handlers/client/createGame';
import updateGame from '@/gameMaps/handlers/client/updateGame';
import deleteGame from '@/gameMaps/handlers/client/deleteGame';

import { mockedGame, mockedGame2 } from '@/gameMaps/types/mocks';
import { FileWithPreview } from '@/common/types/files';

import useGameForm from '../useGameForm';

jest.mock('@/common/hooks/useErrors');
jest.mock('@/gameMaps/validators/game');
jest.mock('@/common/utils/validators');
jest.mock('@/common/utils/files');
jest.mock('@/common/lib/firebase/utils/uploadFile');
jest.mock('@/common/lib/firebase/utils/deleteFile');
jest.mock('@/gameMaps/handlers/client/createGame');
jest.mock('@/gameMaps/handlers/client/updateGame');
jest.mock('@/gameMaps/handlers/client/deleteGame');

describe('useGameForm', () => {
  const mockedData: GameData = mockedGame;
  const mockedErrors = {};
  const mockedAddErrors = jest.fn();
  const mockedCleanErrors = jest.fn();
  const mockedUseErrors = jest.fn(() => ({
    errors: mockedErrors,
    addErrors: mockedAddErrors,
    cleanErrors: mockedCleanErrors,
  }));
  const mockedMapImageRatio = 2;
  const mockedUpdateImageRatio = jest.fn((_, callback) =>
    callback(mockedMapImageRatio)
  );

  const mockedOnFinish = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useErrors as unknown as jest.Mock).mockImplementation(mockedUseErrors);
    (updateImageRatio as unknown as jest.Mock).mockImplementation(
      mockedUpdateImageRatio
    );
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
    onDelete: expect.any(Function),
    values: expectedEmptyValues,
    setters: {
      setTitle: expect.any(Function),
      setDescription: expect.any(Function),
      setBackgroundColor: expect.any(Function),
      setMapImageUrl: expect.any(Function),
      setMapImage: expect.any(Function),
    },
    errors: mockedErrors,
    loading: false,
  };

  const setValues = async (
    setters: Record<string, any>,
    withMapImage = true
  ) => {
    await setters.setBackgroundColor(mockedGame.attributes.backgroundColor);
    await setters.setDescription(mockedGame.attributes.description);
    await setters.setTitle(mockedGame.attributes.title);
    await setters.setMapImageUrl(mockedGame.attributes.mapImageUrl);
    if (withMapImage) await setters.setMapImage(mockedFileWithPreview);
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

  describe('When form was submitted', () => {
    const mockedGameValidatorInstance = {
      validate: 'mocked-game-validator-instance',
    };
    const mockedGameValidator = jest.fn(() => mockedGameValidatorInstance);

    const mockedDeleteFile = jest.fn();

    const mockedMapImageId = 'mocked-map-image-id';
    const mockedUploadFile = jest.fn(() => mockedMapImageId);

    const mockedSubmittedData = 'mocked-submitted-data';
    const mockedCreateGame = jest.fn(() => mockedSubmittedData);
    const mockedUpdateGame = jest.fn(() => mockedSubmittedData);

    beforeEach(() => {
      (GameValidator as unknown as jest.Mock).mockImplementationOnce(
        mockedGameValidator
      );
      (deleteFile as unknown as jest.Mock).mockImplementationOnce(
        mockedDeleteFile
      );

      (uploadFile as unknown as jest.Mock).mockImplementationOnce(
        mockedUploadFile
      );
      (createGame as unknown as jest.Mock).mockImplementationOnce(
        mockedCreateGame
      );
      (updateGame as unknown as jest.Mock).mockImplementationOnce(
        mockedUpdateGame
      );
    });

    test('calls onSubmit', async () => {
      // Arange
      const mockedValidate = jest.fn();
      (validate as unknown as jest.Mock).mockImplementationOnce(mockedValidate);

      const { result } = renderHook(() =>
        useGameForm(undefined, mockedOnFinish)
      );
      await act(async () => {
        await setValues(result.current.setters);
      });
      // Act
      await act(async () => {
        await result.current.onSubmit();
      });
      // Assert
      expect(mockedValidate).toHaveBeenCalledWith(
        mockedGameValidatorInstance,
        mockedAddErrors
      );
      expect(mockedGameValidator).toHaveBeenCalledWith({
        title: mockedGame.attributes.title,
        description: mockedGame.attributes.description,
        backgroundColor: mockedGame.attributes.backgroundColor,
      });
      expect(mockedUploadFile).toHaveBeenCalledWith(
        mockedFileWithPreview,
        `gameMap-${mockedGame.attributes.title}`
      );
      expect(mockedCreateGame).toHaveBeenCalledWith({
        title: mockedGame.attributes.title,
        description: mockedGame.attributes.description,
        backgroundColor: mockedGame.attributes.backgroundColor,
        mapImageId: mockedMapImageId,
        mapImageRatio: mockedMapImageRatio,
      });
      expect(mockedUpdateGame).not.toHaveBeenCalled();
      expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
      expect(mockedDeleteFile).not.toHaveBeenCalled();
      expect(mockedAddErrors).not.toHaveBeenCalled();
      expect(mockedUpdateImageRatio).toHaveBeenCalledWith(
        mockedFileWithPreview,
        expect.any(Function)
      );
    });

    describe('when file did not upload', () => {
      test('calls onSubmit without mapImageId', async () => {
        // Arange
        const mockedValidate = jest.fn();
        (validate as unknown as jest.Mock).mockImplementationOnce(
          mockedValidate
        );

        const { result } = renderHook(() =>
          useGameForm(undefined, mockedOnFinish)
        );
        await act(async () => {
          await setValues(result.current.setters, false);
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedGameValidatorInstance,
          mockedAddErrors
        );
        expect(mockedGameValidator).toHaveBeenCalledWith({
          title: mockedGame.attributes.title,
          description: mockedGame.attributes.description,
          backgroundColor: mockedGame.attributes.backgroundColor,
        });
        expect(mockedUploadFile).not.toHaveBeenCalled();
        expect(mockedCreateGame).toHaveBeenCalledWith({
          title: mockedGame.attributes.title,
          description: mockedGame.attributes.description,
          backgroundColor: mockedGame.attributes.backgroundColor,
        });
        expect(mockedUpdateGame).not.toHaveBeenCalled();
        expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
        expect(mockedDeleteFile).not.toHaveBeenCalled();
        expect(mockedAddErrors).not.toHaveBeenCalled();
      });
    });

    describe('When error occurs while submit', () => {
      test('catches error, deletes file an set caught error', async () => {
        // Arange
        const mockedErrorMessage = 'Error occured!';
        const mockedError = new Error(mockedErrorMessage);
        const mockedValidate = jest.fn(() => {
          throw mockedError;
        });
        (validate as unknown as jest.Mock).mockImplementationOnce(
          mockedValidate
        );

        const { result } = renderHook(() =>
          useGameForm(undefined, mockedOnFinish)
        );
        await act(async () => {
          await setValues(result.current.setters);
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedGameValidatorInstance,
          mockedAddErrors
        );
        expect(mockedGameValidator).toHaveBeenCalledWith({
          title: mockedGame.attributes.title,
          description: mockedGame.attributes.description,
          backgroundColor: mockedGame.attributes.backgroundColor,
        });
        expect(mockedUploadFile).not.toHaveBeenCalled();
        expect(mockedCreateGame).not.toHaveBeenCalled();
        expect(mockedUpdateGame).not.toHaveBeenCalled();
        expect(mockedOnFinish).not.toHaveBeenCalled();
        expect(mockedDeleteFile).toHaveBeenCalledWith(undefined);
        expect(mockedAddErrors).toHaveBeenCalledWith({
          main: mockedErrorMessage,
        });
      });
    });

    describe('When data passed (edit form)', () => {
      test('calls onSubmit', async () => {
        // Arange
        const mockedValidate = jest.fn();
        (validate as unknown as jest.Mock).mockImplementationOnce(
          mockedValidate
        );

        const { result } = renderHook(() =>
          useGameForm(mockedData, mockedOnFinish)
        );
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.setters.setDescription(
            mockedGame2.attributes.description
          );
          await result.current.setters.setMapImage(mockedFileWithPreview);
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedGameValidatorInstance,
          mockedAddErrors
        );
        expect(mockedGameValidator).toHaveBeenCalledWith({
          title: mockedGame.attributes.title,
          description: mockedGame2.attributes.description,
          backgroundColor: mockedGame.attributes.backgroundColor,
        });
        expect(mockedUploadFile).toHaveBeenCalledWith(
          mockedFileWithPreview,
          `gameMap-${mockedGame.attributes.title}`
        );
        expect(mockedCreateGame).not.toHaveBeenCalled();
        expect(mockedUpdateGame).toHaveBeenCalledWith(mockedGame.id, {
          title: mockedGame.attributes.title,
          description: mockedGame2.attributes.description,
          backgroundColor: mockedGame.attributes.backgroundColor,
          mapImageId: mockedMapImageId,
          mapImageRatio: mockedMapImageRatio,
        });
        expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
        expect(mockedDeleteFile).not.toHaveBeenCalled();
        expect(mockedAddErrors).not.toHaveBeenCalled();
        expect(mockedUpdateImageRatio).toHaveBeenCalledWith(
          mockedFileWithPreview,
          expect.any(Function)
        );
      });

      describe('when file did not upload', () => {
        test('calls onSubmit without mapImageId', async () => {
          // Arange
          const mockedValidate = jest.fn();
          (validate as unknown as jest.Mock).mockImplementationOnce(
            mockedValidate
          );

          const { result } = renderHook(() =>
            useGameForm(mockedData, mockedOnFinish)
          );
          await act(async () => {
            await result.current.prepareFormForEdit();
            await result.current.setters.setDescription(
              mockedGame2.attributes.description
            );
          });
          // Act
          await act(async () => {
            await result.current.onSubmit();
          });
          // Assert
          expect(mockedValidate).toHaveBeenCalledWith(
            mockedGameValidatorInstance,
            mockedAddErrors
          );
          expect(mockedGameValidator).toHaveBeenCalledWith({
            title: mockedGame.attributes.title,
            description: mockedGame2.attributes.description,
            backgroundColor: mockedGame.attributes.backgroundColor,
          });
          expect(mockedUploadFile).not.toHaveBeenCalled();
          expect(mockedCreateGame).not.toHaveBeenCalled();
          expect(mockedUpdateGame).toHaveBeenCalledWith(mockedGame.id, {
            title: mockedGame.attributes.title,
            description: mockedGame2.attributes.description,
            backgroundColor: mockedGame.attributes.backgroundColor,
          });
          expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
          expect(mockedDeleteFile).not.toHaveBeenCalled();
          expect(mockedAddErrors).not.toHaveBeenCalled();
          expect(mockedUpdateImageRatio).toHaveBeenCalledWith(
            null,
            expect.any(Function)
          );
        });
      });

      describe('When error occurs while submit', () => {
        test('catches error, deletes file an set caught error', async () => {
          // Arange
          const mockedErrorMessage = 'Error occured!';
          const mockedError = new Error(mockedErrorMessage);
          const mockedValidate = jest.fn(() => {
            throw mockedError;
          });
          (validate as unknown as jest.Mock).mockImplementationOnce(
            mockedValidate
          );

          const { result } = renderHook(() =>
            useGameForm(mockedData, mockedOnFinish)
          );
          await act(async () => {
            await setValues(result.current.setters);
          });
          // Act
          await act(async () => {
            await result.current.onSubmit();
          });
          // Assert
          expect(mockedValidate).toHaveBeenCalledWith(
            mockedGameValidatorInstance,
            mockedAddErrors
          );
          expect(mockedGameValidator).toHaveBeenCalledWith({
            title: mockedGame.attributes.title,
            description: mockedGame.attributes.description,
            backgroundColor: mockedGame.attributes.backgroundColor,
          });
          expect(mockedUploadFile).not.toHaveBeenCalled();
          expect(mockedCreateGame).not.toHaveBeenCalled();
          expect(mockedUpdateGame).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
          expect(mockedDeleteFile).toHaveBeenCalledWith(undefined);
          expect(mockedAddErrors).toHaveBeenCalledWith({
            main: mockedErrorMessage,
          });
        });
      });
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

    describe('when onDelete called', () => {
      test('deletes game', async () => {
        // Arange
        const mockedDeletedData = 'mocked-deleted-no-data';
        const mockedDeleteGame = jest.fn(() => mockedDeletedData);
        (deleteGame as unknown as jest.Mock).mockImplementationOnce(
          mockedDeleteGame
        );

        const { result } = renderHook(() =>
          useGameForm(mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeleteGame).toHaveBeenCalledWith(mockedGame.id);
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
      });

      describe('When error occurs while delete', () => {
        test('catches error and set caught error', async () => {
          // Arange
          const mockedErrorMessage = 'Error occured!';
          const mockedError = new Error(mockedErrorMessage);
          const mockedDeleteGame = jest.fn(() => {
            throw mockedError;
          });
          (deleteGame as unknown as jest.Mock).mockImplementation(
            mockedDeleteGame
          );

          const { result } = renderHook(() =>
            useGameForm(mockedData, mockedOnFinish)
          );
          // Act
          await act(async () => {
            await result.current.prepareFormForEdit();
            await result.current.onDelete();
          });
          // Assert
          expect(mockedOnFinish).not.toHaveBeenCalled();
          expect(mockedAddErrors).toHaveBeenCalledWith({
            main: mockedErrorMessage,
          });
          expect(mockedDeleteGame).toHaveBeenCalledWith(mockedGame.id);
        });
      });

      describe('when data not passed (create form)', () => {
        test('does not delete game', async () => {
          // Arange
          const mockedDeletedData = 'mocked-deleted-no-data';
          const mockedDeleteGame = jest.fn(() => mockedDeletedData);
          (deleteGame as unknown as jest.Mock).mockImplementationOnce(
            mockedDeleteGame
          );

          const { result } = renderHook(() =>
            useGameForm(undefined, mockedOnFinish)
          );
          // Act
          await act(async () => {
            await result.current.onDelete();
          });
          // Assert
          expect(mockedDeleteGame).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
        });
      });
    });
  });
});
