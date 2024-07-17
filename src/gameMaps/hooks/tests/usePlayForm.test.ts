import { renderHook, cleanup, act } from '@testing-library/react';

import { PlayData } from '@/gameMaps/types';

import useErrors from '@/common/hooks/useErrors';

import PlayValidator from '@/gameMaps/validators/play';
import { validate } from '@/common/utils/validators';

import createPlay from '@/gameMaps/handlers/client/createPlay';
import updatePlay from '@/gameMaps/handlers/client/updatePlay';
import deletePlay from '@/gameMaps/handlers/client/deletePlay';

import { mockedGame, mockedPlay, mockedPlay2 } from '@/gameMaps/types/mocks';

import usePlayForm from '../usePlayForm';

jest.mock('@/common/hooks/useErrors');
jest.mock('@/gameMaps/validators/play');
jest.mock('@/common/utils/validators');
jest.mock('@/gameMaps/handlers/client/createPlay');
jest.mock('@/gameMaps/handlers/client/updatePlay');
jest.mock('@/gameMaps/handlers/client/deletePlay');

describe('usePlayForm', () => {
  const mockedData: PlayData = mockedPlay;
  const mockedGameId = mockedGame.id;
  const mockedErrors = {};
  const mockedAddErrors = jest.fn();
  const mockedCleanErrors = jest.fn();
  const mockedUseErrors = jest.fn(() => ({
    errors: mockedErrors,
    addErrors: mockedAddErrors,
    cleanErrors: mockedCleanErrors,
  }));

  const mockedOnFinish = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useErrors as unknown as jest.Mock).mockImplementation(mockedUseErrors);
  });

  const expectedFilledValues = {
    title: mockedPlay.attributes.title,
    description: mockedPlay.attributes.description,
  };

  const expectedEmptyValues = {
    title: '',
    description: '',
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
    },
    errors: mockedErrors,
    loading: false,
  };

  const setValues = async (setters: Record<string, any>) => {
    await setters.setTitle(mockedPlay.attributes.title);
    await setters.setDescription(mockedPlay.attributes.description);
  };

  test('returns empty play form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => usePlayForm(mockedGameId));
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
  });

  describe('When prepares form for edit without data', () => {
    test('returns empty play form state', async () => {
      // Arange
      const { result } = renderHook(() => usePlayForm(mockedGameId));
      // Act
      await act(async () => {
        await result.current.prepareFormForEdit();
      });
      // Assert
      expect(result.current).toEqual(expectedEmptyState);
    });
  });

  describe('When setters called', () => {
    test('returns updated play form state', async () => {
      // Arange
      const { result } = renderHook(() => usePlayForm(mockedGameId));
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
      await act(async () => {
        await setValues(result.current.setters);
      });
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
        title: mockedPlay.attributes.title,
        description: mockedPlay.attributes.description,
      });
      expect(mockedCreatePlay).toHaveBeenCalledWith(mockedGameId, {
        title: mockedPlay.attributes.title,
        description: mockedPlay.attributes.description,
      });
      expect(mockedUpdatePlay).not.toHaveBeenCalled();
      expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
      expect(mockedAddErrors).not.toHaveBeenCalled();
    });

    describe('When error occurs while submit', () => {
      test('catches error and sets caught error', async () => {
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
          usePlayForm(mockedGameId, null, mockedOnFinish)
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
          mockedPlayValidatorInstance,
          mockedAddErrors
        );
        expect(mockedPlayValidator).toHaveBeenCalledWith({
          title: mockedPlay.attributes.title,
          description: mockedPlay.attributes.description,
        });
        expect(mockedCreatePlay).not.toHaveBeenCalled();
        expect(mockedUpdatePlay).not.toHaveBeenCalled();
        expect(mockedOnFinish).not.toHaveBeenCalled();
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
          usePlayForm(mockedGameId, mockedData, mockedOnFinish)
        );
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.setters.setDescription(
            mockedPlay2.attributes.description
          );
        });
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
          title: mockedPlay.attributes.title,
          description: mockedPlay2.attributes.description,
        });
        expect(mockedCreatePlay).not.toHaveBeenCalled();
        expect(mockedUpdatePlay).toHaveBeenCalledWith(
          mockedGameId,
          {
            title: mockedPlay.attributes.title,
            description: mockedPlay2.attributes.description,
          },
          mockedPlay.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
        expect(mockedAddErrors).not.toHaveBeenCalled();
      });

      describe('When error occurs while submit', () => {
        test('catches error and sets caught error', async () => {
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
            usePlayForm(mockedGameId, mockedData, mockedOnFinish)
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
            mockedPlayValidatorInstance,
            mockedAddErrors
          );
          expect(mockedPlayValidator).toHaveBeenCalledWith({
            title: mockedPlay.attributes.title,
            description: mockedPlay.attributes.description,
          });
          expect(mockedCreatePlay).not.toHaveBeenCalled();
          expect(mockedUpdatePlay).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
          expect(mockedAddErrors).toHaveBeenCalledWith({
            main: mockedErrorMessage,
          });
        });
      });
    });
  });

  describe('when data passed', () => {
    describe('When prepares form for edit', () => {
      test('returns updated play form state', async () => {
        // Arange
        const { result } = renderHook(() =>
          usePlayForm(mockedGameId, mockedData)
        );
        // Act
        await act(async () => {
          await result.current.prepareFormForEdit();
        });
        // Assert
        expect(result.current).toEqual({
          ...expectedEmptyState,
          isEditForm: true,
          values: { ...expectedFilledValues },
        });
      });
    });

    describe('When form is cleaned', () => {
      test('returns updated empty play form state', async () => {
        // Arange
        const { result } = renderHook(() =>
          usePlayForm(mockedGameId, mockedData)
        );
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
          await result.current.prepareFormForEdit();
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeletePlay).toHaveBeenCalledWith(
          mockedGame.id,
          mockedPlay.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
      });

      describe('When error occurs while delete', () => {
        test('catches error and set caught error', async () => {
          // Arange
          const mockedErrorMessage = 'Error occured!';
          const mockedError = new Error(mockedErrorMessage);
          const mockedDeletePlay = jest.fn(() => {
            throw mockedError;
          });
          (deletePlay as unknown as jest.Mock).mockImplementation(
            mockedDeletePlay
          );

          const { result } = renderHook(() =>
            usePlayForm(mockedGameId, mockedData, mockedOnFinish)
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
          expect(mockedDeletePlay).toHaveBeenCalledWith(
            mockedGame.id,
            mockedPlay.id
          );
        });
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
