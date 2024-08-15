import { renderHook, cleanup, act } from '@testing-library/react';

import { ItemData } from '@/gameMaps/types';

import useForm from '@/common/hooks/useForm';

import ItemValidator from '@/gameMaps/validators/item';

import createItem from '@/gameMaps/handlers/client/createItem';
import updateItem from '@/gameMaps/handlers/client/updateItem';
import deleteItem from '@/gameMaps/handlers/client/deleteItem';

import { mockedGame, mockedItem } from '@/gameMaps/types/mocks';
import mockUseForm from '@/common/hooks/useForm/mocks';

import useItemForm from '../useItemForm';

jest.mock('@/common/hooks/useForm');
jest.mock('@/gameMaps/validators/item');
jest.mock('@/common/utils/validators');
jest.mock('@/gameMaps/handlers/client/createItem');
jest.mock('@/gameMaps/handlers/client/updateItem');
jest.mock('@/gameMaps/handlers/client/deleteItem');

describe('useItemForm', () => {
  const mockedData: ItemData = mockedItem;
  const mockedGameId = mockedGame.id;
  const mockedPlayId = mockedItem.attributes.playId as string;
  const mockedCategoryId = mockedItem.attributes.categoryId;
  const mockedCoordinates = mockedItem.attributes.coordinates;
  const mockedAdditionalData = {
    gameId: mockedGameId,
    playId: mockedPlayId,
    categoryId: mockedCategoryId,
    coordinates: mockedCoordinates,
  };
  const mockedAddErrors = jest.fn();

  const mockedOnFinish = jest.fn();

  const mockedDescription = 'mocked-description';
  const mockedCollected = 'mocked-collected';

  const mockedIsEditing = 'mocked-is-editing';
  const mockedValues = {
    description: mockedDescription,
    collected: mockedCollected,
  };
  const mockedSetters = {
    setDescription: 'mocked-setDescription',
    setCollected: 'mocked-setCollected',
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

  test('returns empty item form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useItemForm(mockedAdditionalData));
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
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
      const { result } = renderHook(() =>
        useItemForm(mockedAdditionalData, null, mockedOnFinish)
      );
      // Act
      await act(async () => {
        await result.current.onSubmit();
      });
      // Assert
      expect(mockedItemValidator).toHaveBeenCalledWith({
        description: mockedDescription,
        collected: mockedCollected,
      });
      expect(mockedCreateItem).toHaveBeenCalledWith(mockedGameId, {
        description: mockedDescription,
        collected: mockedCollected,
        categoryId: mockedItem.attributes.categoryId,
        playId: mockedItem.attributes.playId,
        coordinates: mockedItem.attributes.coordinates,
      });
      expect(mockedUpdateItem).not.toHaveBeenCalled();
      expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
    });

    describe('When data passed (edit form)', () => {
      test('calls onSubmit', async () => {
        // Arange
        const { result } = renderHook(() =>
          useItemForm(mockedAdditionalData, mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedItemValidator).toHaveBeenCalledWith({
          description: mockedDescription,
          collected: mockedCollected,
        });
        expect(mockedCreateItem).not.toHaveBeenCalled();
        expect(mockedUpdateItem).toHaveBeenCalledWith(
          mockedGameId,
          mockedItem.id,
          {
            description: mockedDescription,
            collected: mockedCollected,
            categoryId: mockedItem.attributes.categoryId,
            playId: mockedItem.attributes.playId,
            coordinates: mockedItem.attributes.coordinates,
          }
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
        expect(mockedAddErrors).not.toHaveBeenCalled();
      });
    });
  });

  describe('when data passed', () => {
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
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeleteItem).toHaveBeenCalledWith(
          mockedGame.id,
          mockedItem.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
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
