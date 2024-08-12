import { renderHook, cleanup, act } from '@testing-library/react';

import { CategoryData } from '@/gameMaps/types';

import useForm from '@/common/hooks/useForm';

import CategoryValidator from '@/gameMaps/validators/category';

import createCategory from '@/gameMaps/handlers/client/createCategory';
import updateCategory from '@/gameMaps/handlers/client/updateCategory';
import deleteCategory from '@/gameMaps/handlers/client/deleteCategory';

import { mockedCategory, mockedGame } from '@/gameMaps/types/mocks';
import mockUseForm from '@/common/hooks/useForm/mocks';

import useCategoryForm from '../useCategoryForm';

jest.mock('@/common/hooks/useForm');
jest.mock('@/gameMaps/validators/category');
jest.mock('@/common/utils/validators');
jest.mock('@/gameMaps/handlers/client/createCategory');
jest.mock('@/gameMaps/handlers/client/updateCategory');
jest.mock('@/gameMaps/handlers/client/deleteCategory');

describe('useCategoryForm', () => {
  const mockedData: CategoryData = mockedCategory;
  const mockedGameId = mockedGame.id;
  const mockedAddErrors = jest.fn();

  const mockedOnFinish = jest.fn();

  const mockedDescription = 'mocked-description';
  const mockedTitle = 'mocked-title';
  const mockedColor = 'mocked-color';
  const mockedItemsAmount = 'mocked-items-amount';

  const mockedIsEditing = 'mocked-is-editing';
  const mockedValues = {
    title: mockedTitle,
    description: mockedDescription,
    color: mockedColor,
    itemsAmount: mockedItemsAmount,
  };
  const mockedSetters = {
    setTitle: 'mocked-setTitle',
    setDescription: 'mocked-setDescription',
    setColor: 'mocked-setColor',
    setItemsAmount: 'mocked-setItemsAmount',
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

  test('returns empty category form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useCategoryForm(mockedGameId));
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
  });

  describe('When form was submitted', () => {
    const mockedCategoryValidatorInstance = {
      validate: 'mocked-category-validator-instance',
    };
    const mockedCategoryValidator = jest.fn(
      () => mockedCategoryValidatorInstance
    );

    const mockedSubmittedData = 'mocked-submitted-data';
    const mockedCreateCategory = jest.fn(() => mockedSubmittedData);
    const mockedUpdateCategory = jest.fn(() => mockedSubmittedData);

    beforeEach(() => {
      (CategoryValidator as unknown as jest.Mock).mockImplementationOnce(
        mockedCategoryValidator
      );
      (createCategory as unknown as jest.Mock).mockImplementationOnce(
        mockedCreateCategory
      );
      (updateCategory as unknown as jest.Mock).mockImplementationOnce(
        mockedUpdateCategory
      );
    });

    test('calls onSubmit', async () => {
      // Arange
      const { result } = renderHook(() =>
        useCategoryForm(mockedGameId, null, mockedOnFinish)
      );
      // Act
      await act(async () => {
        await result.current.onSubmit();
      });
      // Assert
      expect(mockedCategoryValidator).toHaveBeenCalledWith({
        title: mockedTitle,
        description: mockedDescription,
        color: mockedColor,
        itemsAmount: mockedItemsAmount,
      });
      expect(mockedCreateCategory).toHaveBeenCalledWith(mockedGameId, {
        title: mockedTitle,
        description: mockedDescription,
        color: mockedColor,
        itemsAmount: mockedItemsAmount,
      });
      expect(mockedUpdateCategory).not.toHaveBeenCalled();
      expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
      expect(mockedAddErrors).not.toHaveBeenCalled();
    });

    describe('When data passed (edit form)', () => {
      test('calls onSubmit', async () => {
        // Arange
        const { result } = renderHook(() =>
          useCategoryForm(mockedGameId, mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedCategoryValidator).toHaveBeenCalledWith({
          title: mockedTitle,
          description: mockedDescription,
          color: mockedColor,
          itemsAmount: mockedItemsAmount,
        });
        expect(mockedCreateCategory).not.toHaveBeenCalled();
        expect(mockedUpdateCategory).toHaveBeenCalledWith(
          mockedGameId,
          mockedCategory.id,
          {
            title: mockedTitle,
            description: mockedDescription,
            color: mockedColor,
            itemsAmount: mockedItemsAmount,
          }
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(mockedSubmittedData);
        expect(mockedAddErrors).not.toHaveBeenCalled();
      });
    });
  });

  describe('when data passed', () => {
    describe('when onDelete called', () => {
      test('deletes category', async () => {
        // Arange
        const mockedDeletedData = 'mocked-deleted-no-data';
        const mockedDeleteCategory = jest.fn(() => mockedDeletedData);
        (deleteCategory as unknown as jest.Mock).mockImplementationOnce(
          mockedDeleteCategory
        );

        const { result } = renderHook(() =>
          useCategoryForm(mockedGameId, mockedData, mockedOnFinish)
        );
        // Act
        await act(async () => {
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeleteCategory).toHaveBeenCalledWith(
          mockedGame.id,
          mockedCategory.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
      });

      describe('when data not passed (create form)', () => {
        test('does not delete category', async () => {
          // Arange
          const mockedDeletedData = 'mocked-deleted-no-data';
          const mockedDeleteCategory = jest.fn(() => mockedDeletedData);
          (deleteCategory as unknown as jest.Mock).mockImplementationOnce(
            mockedDeleteCategory
          );

          const { result } = renderHook(() =>
            useCategoryForm(mockedGameId, null, mockedOnFinish)
          );
          // Act
          await act(async () => {
            await result.current.onDelete();
          });
          // Assert
          expect(mockedDeleteCategory).not.toHaveBeenCalled();
          expect(mockedOnFinish).not.toHaveBeenCalled();
        });
      });
    });
  });
});
