import { renderHook, cleanup, act } from '@testing-library/react';

import { ItemData } from '@/gameMaps/types';

import useErrors from '@/common/hooks/useErrors';

import ItemValidator from '@/gameMaps/validators/item';
import { validate } from '@/common/utils/validators';

import createItem from '@/gameMaps/handlers/client/createItem';
import updateItem from '@/gameMaps/handlers/client/updateItem';
import deleteItem from '@/gameMaps/handlers/client/deleteItem';

import { mockedGame, mockedItem, mockedItem2 } from '@/gameMaps/types/mocks';

import useItemForm from '../useItemForm';

jest.mock('@/common/hooks/useErrors');
jest.mock('@/gameMaps/validators/item');
jest.mock('@/common/utils/validators');
jest.mock('@/gameMaps/handlers/client/createItem');
jest.mock('@/gameMaps/handlers/client/updateItem');
jest.mock('@/gameMaps/handlers/client/deleteItem');

describe('useItemForm', () => {
  const mockedData: ItemData = mockedItem;
  const mockedGameId = mockedGame.id;
  const mockedPlayId = mockedItem.attributes.playId;
  const mockedCategoryId = mockedItem.attributes.categoryId;
  const mockedCoordinates = mockedItem.attributes.coordinates;
  const mockedAdditionalData = {
    gameId: mockedGameId,
    playId: mockedPlayId,
    categoryId: mockedCategoryId,
    coordinates: mockedCoordinates,
  };
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
    description: mockedItem.attributes.description,
    collected: mockedItem.attributes.collected,
  };

  const expectedEmptyValues = {
    description: '',
    collected: false,
  };

  const expectedEmptyState = {
    prepareFormForEdit: expect.any(Function),
    cleanForm: expect.any(Function),
    isEditForm: false,
    onSubmit: expect.any(Function),
    onDelete: expect.any(Function),
    values: expectedEmptyValues,
    setters: {
      setDescription: expect.any(Function),
      setCollected: expect.any(Function),
    },
    errors: mockedErrors,
    loading: false,
  };

  const setValues = async (setters: Record<string, any>) => {
    await setters.setDescription(mockedItem.attributes.description);
    await setters.setCollected(mockedItem.attributes.collected);
  };

  test('returns empty item form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useItemForm(mockedAdditionalData));
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
  });

  describe('When prepares form for edit without data', () => {
    test('returns empty item form state', async () => {
      // Arange
      const { result } = renderHook(() => useItemForm(mockedAdditionalData));
      // Act
      await act(async () => {
        await result.current.prepareFormForEdit();
      });
      // Assert
      expect(result.current).toEqual(expectedEmptyState);
    });
  });

  describe('When setters called', () => {
    test('returns updated item form state', async () => {
      // Arange
      const { result } = renderHook(() => useItemForm(mockedAdditionalData));
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
    const mockedItemValidatorInstance = {
      validate: 'mocked-validator-instance',
    };
    const mockedItemValidator = jest.fn(() => mockedItemValidatorInstance);

    const mockedSubmittedData = 'mocked-submitted-data';
    const mockedCreateItem = jest.fn(() => mockedSubmittedData);
    const mockedUpdateItem = jest.fn(() => mockedSubmittedData);

    beforeEach(() => {
      (ItemValidator as unknown as jest.Mock).mockImplementationOnce(
        mockedItemValidator
      );
      (createItem as unknown as jest.Mock).mockImplementationOnce(
        mockedCreateItem
      );
      (updateItem as unknown as jest.Mock).mockImplementationOnce(
        mockedUpdateItem
      );
    });

    test('calls onSubmit', async () => {
      // Arange
      const mockedValidate = jest.fn();
      (validate as unknown as jest.Mock).mockImplementationOnce(mockedValidate);

      const { result } = renderHook(() =>
        useItemForm(mockedAdditionalData, null, mockedOnFinish)
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
        mockedItemValidatorInstance,
        mockedAddErrors
      );
      expect(mockedItemValidator).toHaveBeenCalledWith({
        description: mockedItem.attributes.description,
        collected: mockedItem.attributes.collected,
      });
      expect(mockedCreateItem).toHaveBeenCalledWith(mockedGameId, {
        description: mockedItem.attributes.description,
        collected: mockedItem.attributes.collected,
        categoryId: mockedItem.attributes.categoryId,
        playId: mockedItem.attributes.playId,
        coordinates: mockedItem.attributes.coordinates,
      });
      expect(mockedUpdateItem).not.toHaveBeenCalled();
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
          useItemForm(mockedAdditionalData, null, mockedOnFinish)
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
          mockedItemValidatorInstance,
          mockedAddErrors
        );
        expect(mockedItemValidator).toHaveBeenCalledWith({
          description: mockedItem.attributes.description,
          collected: mockedItem.attributes.collected,
        });
        expect(mockedCreateItem).not.toHaveBeenCalled();
        expect(mockedUpdateItem).not.toHaveBeenCalled();
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
          useItemForm(mockedAdditionalData, mockedData, mockedOnFinish)
        );
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.setters.setDescription(
            mockedItem2.attributes.description
          );
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedItemValidatorInstance,
          mockedAddErrors
        );
        expect(mockedItemValidator).toHaveBeenCalledWith({
          description: mockedItem2.attributes.description,
          collected: mockedItem.attributes.collected,
        });
        expect(mockedCreateItem).not.toHaveBeenCalled();
        expect(mockedUpdateItem).toHaveBeenCalledWith(
          mockedGameId,
          mockedItem.id,
          {
            description: mockedItem2.attributes.description,
            collected: mockedItem.attributes.collected,
            categoryId: mockedItem.attributes.categoryId,
            playId: mockedItem.attributes.playId,
            coordinates: mockedItem.attributes.coordinates,
          }
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
            useItemForm(mockedAdditionalData, mockedData, mockedOnFinish)
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
            mockedItemValidatorInstance,
            mockedAddErrors
          );
          expect(mockedItemValidator).toHaveBeenCalledWith({
            description: mockedItem.attributes.description,
            collected: mockedItem.attributes.collected,
          });
          expect(mockedCreateItem).not.toHaveBeenCalled();
          expect(mockedUpdateItem).not.toHaveBeenCalled();
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
      test('returns updated item form state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useItemForm(mockedAdditionalData, mockedData)
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
      test('returns updated empty item form state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useItemForm(mockedAdditionalData, mockedData)
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
      test('deletes item', async () => {
        // Arange
        const mockedDeletedData = 'mocked-deleted-no-data';
        const mockedDeleteItem = jest.fn(() => mockedDeletedData);
        (deleteItem as unknown as jest.Mock).mockImplementationOnce(
          mockedDeleteItem
        );

        const { result } = renderHook(() =>
          useItemForm(mockedAdditionalData, mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeleteItem).toHaveBeenCalledWith(
          mockedGame.id,
          mockedItem.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
      });

      describe('When error occurs while delete', () => {
        test('catches error and set caught error', async () => {
          // Arange
          const mockedErrorMessage = 'Error occured!';
          const mockedError = new Error(mockedErrorMessage);
          const mockedDeleteItem = jest.fn(() => {
            throw mockedError;
          });
          (deleteItem as unknown as jest.Mock).mockImplementation(
            mockedDeleteItem
          );

          const { result } = renderHook(() =>
            useItemForm(mockedAdditionalData, mockedData, mockedOnFinish)
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
          expect(mockedDeleteItem).toHaveBeenCalledWith(
            mockedGame.id,
            mockedItem.id
          );
        });
      });

      describe('when data not passed (create form)', () => {
        test('does not delete item', async () => {
          // Arange
          const mockedDeletedData = 'mocked-deleted-no-data';
          const mockedDeleteItem = jest.fn(() => mockedDeletedData);
          (deleteItem as unknown as jest.Mock).mockImplementationOnce(
            mockedDeleteItem
          );

          const { result } = renderHook(() =>
            useItemForm(mockedAdditionalData, null, mockedOnFinish)
          );
          // Act
          await act(async () => {
            await result.current.onDelete();
          });
          // Assert
          expect(mockedDeleteItem).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
        });
      });
    });
  });
});
