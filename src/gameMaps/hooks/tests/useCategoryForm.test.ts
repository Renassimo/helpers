import { renderHook, cleanup, act } from '@testing-library/react';

import { CategoryData } from '@/gameMaps/types';

import useErrors from '@/common/hooks/useErrors';

import CategoryValidator from '@/gameMaps/validators/category';
import { validate } from '@/common/utils/validators';

import createCategory from '@/gameMaps/handlers/client/createCategory';
import updateCategory from '@/gameMaps/handlers/client/updateCategory';
import deleteCategory from '@/gameMaps/handlers/client/deleteCategory';

import {
  mockedCategory,
  mockedCategory2,
  mockedGame,
} from '@/gameMaps/types/mocks';

import useCategoryForm from '../useCategoryForm';

jest.mock('@/common/hooks/useErrors');
jest.mock('@/gameMaps/validators/category');
jest.mock('@/common/utils/validators');
jest.mock('@/gameMaps/handlers/client/createCategory');
jest.mock('@/gameMaps/handlers/client/updateCategory');
jest.mock('@/gameMaps/handlers/client/deleteCategory');

describe('useCategoryForm', () => {
  const mockedData: CategoryData = mockedCategory;
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
    title: mockedCategory.attributes.title,
    description: mockedCategory.attributes.description,
    color: mockedCategory.attributes.color,
    itemsAmount: mockedCategory.attributes.itemsAmount,
  };

  const expectedEmptyValues = {
    title: '',
    description: '',
    color: '',
    itemsAmount: 0,
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
      setColor: expect.any(Function),
      setItemsAmount: expect.any(Function),
    },
    errors: mockedErrors,
    loading: false,
  };

  const setValues = async (setters: Record<string, any>) => {
    await setters.setTitle(mockedCategory.attributes.title);
    await setters.setDescription(mockedCategory.attributes.description);
    await setters.setColor(mockedCategory.attributes.color);
    await setters.setItemsAmount(mockedCategory.attributes.itemsAmount);
  };

  test('returns empty category form state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useCategoryForm(mockedGameId));
    // Assert
    expect(result.current).toEqual(expectedEmptyState);
  });

  describe('When prepares form for edit without data', () => {
    test('returns empty category form state', async () => {
      // Arange
      const { result } = renderHook(() => useCategoryForm(mockedGameId));
      // Act
      await act(async () => {
        await result.current.prepareFormForEdit();
      });
      // Assert
      expect(result.current).toEqual(expectedEmptyState);
    });
  });

  describe('When setters called', () => {
    test('returns updated category form state', async () => {
      // Arange
      const { result } = renderHook(() => useCategoryForm(mockedGameId));
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
      const mockedValidate = jest.fn();
      (validate as unknown as jest.Mock).mockImplementationOnce(mockedValidate);

      const { result } = renderHook(() =>
        useCategoryForm(mockedGameId, null, mockedOnFinish)
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
        mockedCategoryValidatorInstance,
        mockedAddErrors
      );
      expect(mockedCategoryValidator).toHaveBeenCalledWith({
        title: mockedCategory.attributes.title,
        description: mockedCategory.attributes.description,
        color: mockedCategory.attributes.color,
        itemsAmount: mockedCategory.attributes.itemsAmount,
      });
      expect(mockedCreateCategory).toHaveBeenCalledWith(mockedGameId, {
        title: mockedCategory.attributes.title,
        description: mockedCategory.attributes.description,
        color: mockedCategory.attributes.color,
        itemsAmount: mockedCategory.attributes.itemsAmount,
      });
      expect(mockedUpdateCategory).not.toHaveBeenCalled();
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
          useCategoryForm(mockedGameId, null, mockedOnFinish)
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
          mockedCategoryValidatorInstance,
          mockedAddErrors
        );
        expect(mockedCategoryValidator).toHaveBeenCalledWith({
          title: mockedCategory.attributes.title,
          description: mockedCategory.attributes.description,
          color: mockedCategory.attributes.color,
          itemsAmount: mockedCategory.attributes.itemsAmount,
        });
        expect(mockedCreateCategory).not.toHaveBeenCalled();
        expect(mockedUpdateCategory).not.toHaveBeenCalled();
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
          useCategoryForm(mockedGameId, mockedData, mockedOnFinish)
        );
        await act(async () => {
          await result.current.prepareFormForEdit();
          await result.current.setters.setDescription(
            mockedCategory2.attributes.description
          );
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedValidate).toHaveBeenCalledWith(
          mockedCategoryValidatorInstance,
          mockedAddErrors
        );
        expect(mockedCategoryValidator).toHaveBeenCalledWith({
          title: mockedCategory.attributes.title,
          description: mockedCategory2.attributes.description,
          color: mockedCategory.attributes.color,
          itemsAmount: mockedCategory.attributes.itemsAmount,
        });
        expect(mockedCreateCategory).not.toHaveBeenCalled();
        expect(mockedUpdateCategory).toHaveBeenCalledWith(
          mockedGameId,
          mockedCategory.id,
          {
            title: mockedCategory.attributes.title,
            description: mockedCategory2.attributes.description,
            color: mockedCategory.attributes.color,
            itemsAmount: mockedCategory.attributes.itemsAmount,
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
            useCategoryForm(mockedGameId, mockedData, mockedOnFinish)
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
            mockedCategoryValidatorInstance,
            mockedAddErrors
          );
          expect(mockedCategoryValidator).toHaveBeenCalledWith({
            title: mockedCategory.attributes.title,
            description: mockedCategory.attributes.description,
            color: mockedCategory.attributes.color,
            itemsAmount: mockedCategory.attributes.itemsAmount,
          });
          expect(mockedCreateCategory).not.toHaveBeenCalled();
          expect(mockedUpdateCategory).not.toHaveBeenCalled();
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
      test('returns updated category form state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useCategoryForm(mockedGameId, mockedData)
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
      test('returns updated empty category form state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useCategoryForm(mockedGameId, mockedData)
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
          await result.current.prepareFormForEdit();
          await result.current.onDelete();
        });
        // Assert
        expect(mockedDeleteCategory).toHaveBeenCalledWith(
          mockedGame.id,
          mockedCategory.id
        );
        expect(mockedOnFinish).toHaveBeenCalledWith(null);
      });

      describe('When error occurs while delete', () => {
        test('catches error and set caught error', async () => {
          // Arange
          const mockedErrorMessage = 'Error occured!';
          const mockedError = new Error(mockedErrorMessage);
          const mockedDeleteCategory = jest.fn(() => {
            throw mockedError;
          });
          (deleteCategory as unknown as jest.Mock).mockImplementation(
            mockedDeleteCategory
          );

          const { result } = renderHook(() =>
            useCategoryForm(mockedGameId, mockedData, mockedOnFinish)
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
          expect(mockedDeleteCategory).toHaveBeenCalledWith(
            mockedGame.id,
            mockedCategory.id
          );
        });
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
