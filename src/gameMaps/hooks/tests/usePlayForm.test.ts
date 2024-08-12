import { renderHook, cleanup, act } from '@testing-library/react';

import { PlayData } from '@/gameMaps/types';

import useForm from '@/common/hooks/useForm';

import PlayValidator from '@/gameMaps/validators/play';
import { validate } from '@/common/utils/validators';

import createPlay from '@/gameMaps/handlers/client/createPlay';
import updatePlay from '@/gameMaps/handlers/client/updatePlay';
import deletePlay from '@/gameMaps/handlers/client/deletePlay';

import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';
import mockUseForm from '@/common/hooks/useForm/mocks';

import usePlayForm from '../usePlayForm';

jest.mock('@/common/hooks/useForm');
jest.mock('@/gameMaps/validators/play');
jest.mock('@/common/utils/validators');
jest.mock('@/gameMaps/handlers/client/createPlay');
jest.mock('@/gameMaps/handlers/client/updatePlay');
jest.mock('@/gameMaps/handlers/client/deletePlay');

describe('usePlayForm', () => {
  const mockedData: PlayData = mockedPlay;
  const mockedGameId = mockedGame.id;
  const mockedAddErrors = jest.fn();

  const mockedOnFinish = jest.fn();

  const mockedDescription = 'mocked-description';
  const mockedTitle = 'mocked-title';

  const mockedIsEditing = 'mocked-is-editing';
  const mockedValues = {
    title: mockedTitle,
    description: mockedDescription,
  };
  const mockedSetters = {
    setTitle: 'mocked-setTitle',
    setDescription: 'mocked-setDescription',
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
  });

  const expectedEmptyState = {
    prepareFormForEdit: mockedPrepareForEdit,
    cleanForm: mockedClear,
    isEditForm: mockedIsEditing,
    onSubmit: expect.any(Function),
    onDelete: expect.any(Function),
    values: mockedValues,
    setters: mockedSetters,
    errors: mockedErrors,
    loading: mockedLoading,
  };

  test('returns empty play form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => usePlayForm(mockedGameId));
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
  });

  describe('When form was submitted', () => {
    const mockedPlayValidatorInstance = {
      validate: 'mocked-game-validator-instance',
    };
    const mockedPlayValidator = jest.fn(() => mockedPlayValidatorInstance);

    const mockedSubmittedData = 'mocked-submitted-data';
    const mockedCreatePlay = jest.fn(() => mockedSubmittedData);
    const mockedUpdatePlay = jest.fn(() => mockedSubmittedData);

    beforeEach(() => {
      (PlayValidator as unknown as jest.Mock).mockImplementationOnce(
        mockedPlayValidator
      );
      (createPlay as unknown as jest.Mock).mockImplementationOnce(
        mockedCreatePlay
      );
      (updatePlay as unknown as jest.Mock).mockImplementationOnce(
        mockedUpdatePlay
      );
    });

    test('calls onSubmit', async () => {
      // Arange
      const mockedValidate = jest.fn();
      (validate as unknown as jest.Mock).mockImplementationOnce(mockedValidate);

      const { result } = renderHook(() =>
        usePlayForm(mockedGameId, null, mockedOnFinish)
      );
      // Act
      await act(async () => {
        await result.current.onSubmit();
      });
      // Assert
      expect(mockedValidate).toHaveBeenCalledWith(
        mockedPlayValidatorInstance,
        mockedAddErrors
      );
      expect(mockedPlayValidator).toHaveBeenCalledWith({
        title: mockedTitle,
        description: mockedDescription,
      });
      expect(mockedCreatePlay).toHaveBeenCalledWith(mockedGameId, {
        title: mockedTitle,
        description: mockedDescription,
      });
      expect(mockedUpdatePlay).not.toHaveBeenCalled();
      expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
      expect(mockedAddErrors).not.toHaveBeenCalled();
    });

    describe('When data passed (edit form)', () => {
      test('calls onSubmit', async () => {
        // Arange
        const mockedValidate = jest.fn();
        (validate as unknown as jest.Mock).mockImplementationOnce(
          mockedValidate
        );

        const { result } = renderHook(() =>
          usePlayForm(mockedGameId, mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedPlayValidatorInstance,
          mockedAddErrors
        );
        expect(mockedPlayValidator).toHaveBeenCalledWith({
          title: mockedTitle,
          description: mockedDescription,
        });
        expect(mockedCreatePlay).not.toHaveBeenCalled();
        expect(mockedUpdatePlay).toHaveBeenCalledWith(
          mockedGameId,
          mockedPlay.id,
          {
            title: mockedTitle,
            description: mockedDescription,
          }
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
        expect(mockedAddErrors).not.toHaveBeenCalled();
      });
    });
  });

  describe('when data passed', () => {
    describe('when onDelete called', () => {
      test('deletes play', async () => {
        // Arange
        const mockedDeletedData = 'mocked-deleted-no-data';
        const mockedDeletePlay = jest.fn(() => mockedDeletedData);
        (deletePlay as unknown as jest.Mock).mockImplementationOnce(
          mockedDeletePlay
        );

        const { result } = renderHook(() =>
          usePlayForm(mockedGameId, mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeletePlay).toHaveBeenCalledWith(
          mockedGame.id,
          mockedPlay.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
      });

      describe('when data not passed (create form)', () => {
        test('does not delete play', async () => {
          // Arange
          const mockedDeletedData = 'mocked-deleted-no-data';
          const mockedDeletePlay = jest.fn(() => mockedDeletedData);
          (deletePlay as unknown as jest.Mock).mockImplementationOnce(
            mockedDeletePlay
          );

          const { result } = renderHook(() =>
            usePlayForm(mockedGameId, null, mockedOnFinish)
          );
          // Act
          await act(async () => {
            await result.current.onDelete();
          });
          // Assert
          expect(mockedDeletePlay).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
        });
      });
    });
  });
});
