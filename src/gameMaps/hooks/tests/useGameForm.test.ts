import { renderHook, cleanup, act } from '@testing-library/react';

import { GameData } from '@/gameMaps/types';

import useForm from '@/common/hooks/useForm';

import GameValidator from '@/gameMaps/validators/game';
import { validate } from '@/common/utils/validators';
import { updateImageRatio } from '@/common/utils/files';

import uploadFile from '@/common/lib/firebase/utils/uploadFile';
import deleteFile from '@/common/lib/firebase/utils/deleteFile';

import createGame from '@/gameMaps/handlers/client/createGame';
import updateGame from '@/gameMaps/handlers/client/updateGame';
import deleteGame from '@/gameMaps/handlers/client/deleteGame';

import { mockedGame } from '@/gameMaps/types/mocks';
import mockUseForm from '@/common/hooks/useForm/mocks';

import { FileWithPreview } from '@/common/types/files';

import useGameForm from '../useGameForm';

jest.mock('@/common/hooks/useForm');
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
  const mockedAddErrors = jest.fn();
  const mockedMapImageRatio = 2;
  const mockedUpdateImageRatio = jest.fn((_, callback) =>
    callback(mockedMapImageRatio)
  );

  const mockedOnFinish = jest.fn();

  const mockedDescription = 'mocked-description';
  const mockedTitle = 'mocked-title';
  const mockedBackgroundColor = 'mocked-background-color';
  const mockedMapImageUrl = 'mocked-map-image-url';

  const mockedIsEditing = 'mocked-is-editing';
  const mockedValues = {
    title: mockedTitle,
    description: mockedDescription,
    backgroundColor: mockedBackgroundColor,
    mapImageUrl: mockedMapImageUrl,
  };
  const mockedSetters = {
    setTitle: 'mocked-setTitle',
    setDescription: 'mocked-setDescription',
    setBackgroundColor: 'mocked-setBackgroundColor',
    setMapImageUrl: 'mocked-setMapImageUrl',
  };
  const mockedLoading = 'mocked-loading';
  const mockedErrors = 'mocked-errors';
  const mockedClear = 'mocked-clear';
  const mockedPrepareForEdit = 'mocked-prepare-for-edit';
  const mockedUseForm = mockUseForm({
    mockedIsEditing,
    mockedValues,
    mockedSetters,
    mockedLoading,
    mockedErrors,
    mockedClear,
    mockedPrepareForEdit,
    mockedAddErrors,
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useForm as unknown as jest.Mock).mockImplementation(mockedUseForm);
    (updateImageRatio as unknown as jest.Mock).mockImplementation(
      mockedUpdateImageRatio
    );
  });

  const mockedFileWithPreview = new File([], 'file') as FileWithPreview;

  const expectedEmptyState = {
    prepareFormForEdit: mockedPrepareForEdit,
    cleanForm: mockedClear,
    isEditForm: mockedIsEditing,
    onSubmit: expect.any(Function),
    onDelete: expect.any(Function),
    values: { ...mockedValues, mapImage: null },
    setters: { ...mockedSetters, setMapImage: expect.any(Function) },
    errors: mockedErrors,
    loading: mockedLoading,
  };

  test('returns empty game form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useGameForm());
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
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
        title: mockedTitle,
        description: mockedDescription,
        backgroundColor: mockedBackgroundColor,
      });
      expect(mockedUploadFile).toHaveBeenCalledWith(
        mockedFileWithPreview,
        `gameMap-mocked-title`
      );
      expect(mockedCreateGame).toHaveBeenCalledWith({
        title: mockedTitle,
        description: mockedDescription,
        backgroundColor: mockedBackgroundColor,
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
          title: mockedTitle,
          description: mockedDescription,
          backgroundColor: mockedBackgroundColor,
        });
        expect(mockedUploadFile).not.toHaveBeenCalled();
        expect(mockedCreateGame).toHaveBeenCalledWith({
          title: mockedTitle,
          description: mockedDescription,
          backgroundColor: mockedBackgroundColor,
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
        // Act
        let expectedError;
        try {
          await act(async () => {
            await result.current.onSubmit();
          });
        } catch (error) {
          expectedError = error;
        }
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedGameValidatorInstance,
          mockedAddErrors
        );
        expect(mockedGameValidator).toHaveBeenCalledWith({
          title: mockedTitle,
          description: mockedDescription,
          backgroundColor: mockedBackgroundColor,
        });
        expect(mockedUploadFile).not.toHaveBeenCalled();
        expect(mockedCreateGame).not.toHaveBeenCalled();
        expect(mockedUpdateGame).not.toHaveBeenCalled();
        expect(mockedOnFinish).not.toHaveBeenCalled();
        expect(mockedDeleteFile).toHaveBeenCalledWith(undefined);
        expect(expectedError).toEqual(mockedError);
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
          title: mockedTitle,
          description: mockedDescription,
          backgroundColor: mockedBackgroundColor,
        });
        expect(mockedUploadFile).toHaveBeenCalledWith(
          mockedFileWithPreview,
          `gameMap-mocked-title`
        );
        expect(mockedCreateGame).not.toHaveBeenCalled();
        expect(mockedUpdateGame).toHaveBeenCalledWith(mockedGame.id, {
          title: mockedTitle,
          description: mockedDescription,
          backgroundColor: mockedBackgroundColor,
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
            title: mockedTitle,
            description: mockedDescription,
            backgroundColor: mockedBackgroundColor,
          });
          expect(mockedUploadFile).not.toHaveBeenCalled();
          expect(mockedCreateGame).not.toHaveBeenCalled();
          expect(mockedUpdateGame).toHaveBeenCalledWith(mockedGame.id, {
            title: mockedTitle,
            description: mockedDescription,
            backgroundColor: mockedBackgroundColor,
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
            await result.current.setters.setMapImage(mockedFileWithPreview);
          });
          // Act
          let expectedError;
          try {
            await act(async () => {
              await result.current.onSubmit();
            });
          } catch (error) {
            expectedError = error;
          }
          // Assert
          expect(mockedValidate).toHaveBeenCalledWith(
            mockedGameValidatorInstance,
            mockedAddErrors
          );
          expect(mockedGameValidator).toHaveBeenCalledWith({
            title: mockedTitle,
            description: mockedDescription,
            backgroundColor: mockedBackgroundColor,
          });
          expect(mockedUploadFile).not.toHaveBeenCalled();
          expect(mockedCreateGame).not.toHaveBeenCalled();
          expect(mockedUpdateGame).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
          expect(mockedDeleteFile).toHaveBeenCalledWith(undefined);
          expect(expectedError).toEqual(mockedError);
        });
      });
    });
  });

  describe('when data passed', () => {
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
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeleteGame).toHaveBeenCalledWith(mockedGame.id);
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
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
