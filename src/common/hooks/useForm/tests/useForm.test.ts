import { cleanup, renderHook } from '@testing-library/react';
import useErrors from '@/common/hooks/useErrors';
import useForm from '../useForm';
import { act } from 'react-dom/test-utils';

jest.mock('@/common/hooks/useErrors');

describe('useForm', () => {
  const mockedErrors = 'mocked-errors';
  const mockedAddErrors = jest.fn();
  const mockedCleanErrors = jest.fn();
  const mockedUseErrors = jest.fn(() => ({
    errors: mockedErrors,
    addErrors: mockedAddErrors,
    cleanErrors: mockedCleanErrors,
  }));

  beforeEach(() => {
    (useErrors as unknown as jest.Mock).mockImplementation(mockedUseErrors);
  });

  const mockedDefaultValues = { value1: '', value2: 0 };
  const mockedAttributes = { value1: 'value-1', value2: 1 };
  const mockedOnDelete = jest.fn();
  const mockedOnSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expectedDefaultState = {
    isEditing: false,
    values: mockedDefaultValues,
    setters: {
      setValue1: expect.any(Function),
      setValue2: expect.any(Function),
    },
    loading: false,
    errors: mockedErrors,
    clear: expect.any(Function),
    prepareForEdit: expect.any(Function),
    addErrors: expect.any(Function),
    onDelete: expect.any(Function),
    onSubmit: expect.any(Function),
  };

  test('returns state', () => {
    // Arange
    const mockedProps = {
      defaultValues: mockedDefaultValues,
      onDelete: mockedOnDelete,
      onSubmit: mockedOnSubmit,
    };
    // Act
    const { result } = renderHook(() => useForm(mockedProps));
    // Assert
    expect(result.current).toEqual(expectedDefaultState);
  });

  describe('when sets value', () => {
    test('returns state', async () => {
      // Arange
      const mockedProps = {
        defaultValues: mockedDefaultValues,
      };
      const mockdUpdatedValue = 'updated value';
      const expectedState = {
        ...expectedDefaultState,
        values: {
          ...mockedDefaultValues,
          value1: mockdUpdatedValue,
        },
      };
      const { result } = renderHook(() => useForm(mockedProps));
      // Act
      await act(async () => {
        await result.current.setters.setValue1(mockdUpdatedValue);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when attribues passed and prepares form to edit', () => {
    test('returns state', async () => {
      // Arange
      const mockedProps = {
        defaultValues: mockedDefaultValues,
        attributes: mockedAttributes,
      };
      const expectedState = {
        ...expectedDefaultState,
        isEditing: true,
        values: mockedAttributes,
      };
      const { result } = renderHook(() => useForm(mockedProps));
      // Act
      await act(async () => {
        await result.current.prepareForEdit();
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });

    describe('when sets value', () => {
      test('returns state', async () => {
        // Arange
        const mockedProps = {
          defaultValues: mockedDefaultValues,
          attributes: mockedAttributes,
        };
        const mockdUpdatedValue = 777;
        const expectedState = {
          ...expectedDefaultState,
          isEditing: true,
          values: {
            ...mockedAttributes,
            value2: mockdUpdatedValue,
          },
        };
        const { result } = renderHook(() => useForm(mockedProps));
        await act(async () => {
          await result.current.prepareForEdit();
        });
        // Act
        await act(async () => {
          await result.current.setters.setValue2(mockdUpdatedValue);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
      });
    });

    describe('and the clears the form', () => {
      test('returns state', async () => {
        // Arange
        const mockedProps = {
          defaultValues: mockedDefaultValues,
          attributes: mockedAttributes,
        };
        const expectedState = {
          ...expectedDefaultState,
          isEditing: true,
        };
        const { result } = renderHook(() => useForm(mockedProps));
        await act(async () => {
          await result.current.prepareForEdit();
        });
        // Act
        await act(async () => {
          await result.current.clear();
        });
        // Assert
        expect(result.current).toEqual(expectedState);
      });
    });
  });

  describe('when calls addErrors', () => {
    test('calls mockedAddErrors', async () => {
      // Arange
      const mockedProps = {
        defaultValues: mockedDefaultValues,
      };
      const mockedError = { error: 'mocked-error' };
      const { result } = renderHook(() => useForm(mockedProps));
      // Act
      await act(async () => {
        await result.current.addErrors(mockedError);
      });
      // Assert
      expect(mockedAddErrors).toHaveBeenCalledWith(mockedError);
      expect(result.current.loading).toBeFalsy();
    });
  });

  describe('when calls onDelete', () => {
    test('calls mockedOnDelete', async () => {
      // Arange
      const mockedProps = {
        defaultValues: mockedDefaultValues,
        attributes: mockedAttributes,
        onDelete: mockedOnDelete,
        onSubmit: mockedOnSubmit,
      };
      const { result } = renderHook(() => useForm(mockedProps));
      // Act
      await act(async () => {
        await result.current.onDelete();
      });
      // Assert
      expect(mockedOnDelete).toHaveBeenCalledWith();
      expect(mockedOnSubmit).not.toHaveBeenCalled();
      expect(mockedAddErrors).not.toHaveBeenCalled();
      expect(result.current.loading).toBeFalsy();
    });

    describe('and attributes not provided', () => {
      test('does not call mockedOnDelete', async () => {
        // Arange
        const mockedProps = {
          defaultValues: mockedDefaultValues,
          onDelete: mockedOnDelete,
          onSubmit: mockedOnSubmit,
        };
        const { result } = renderHook(() => useForm(mockedProps));
        // Act
        await act(async () => {
          await result.current.onDelete();
        });
        // Assert
        expect(mockedOnDelete).not.toHaveBeenCalled();
        expect(mockedOnSubmit).not.toHaveBeenCalled();
        expect(mockedAddErrors).not.toHaveBeenCalled();
        expect(result.current.loading).toBeFalsy();
      });

      describe('but error happens', () => {
        test('calls addErrors', async () => {
          // Arange
          const mockedErrorMessage = 'mocked-error';
          const mockedError = new Error('mocked-error');
          const expectedErrors = { main: mockedErrorMessage };
          const mockedOnDelete = jest.fn(() => {
            throw mockedError;
          });
          const mockedProps = {
            defaultValues: mockedDefaultValues,
            attributes: mockedAttributes,
            onDelete: mockedOnDelete,
            onSubmit: mockedOnSubmit,
          };
          const { result } = renderHook(() => useForm(mockedProps));
          // Act
          await act(async () => {
            await result.current.onDelete();
          });
          // Assert
          expect(mockedOnDelete).toHaveBeenCalledWith();
          expect(mockedOnSubmit).not.toHaveBeenCalled();
          expect(mockedAddErrors).toHaveBeenCalledWith(expectedErrors);
          expect(result.current.loading).toBeFalsy();
        });
      });
    });
  });

  describe('when calls onSubmit', () => {
    test('calls mockedOnSubmit', async () => {
      // Arange
      const mockedProps = {
        defaultValues: mockedDefaultValues,
        attributes: mockedAttributes,
        onDelete: mockedOnDelete,
        onSubmit: mockedOnSubmit,
      };
      const { result } = renderHook(() => useForm(mockedProps));
      // Act
      await act(async () => {
        await result.current.onSubmit();
      });
      // Assert
      expect(mockedOnDelete).not.toHaveBeenCalledWith();
      expect(mockedOnSubmit).toHaveBeenCalledWith(mockedDefaultValues);
      expect(mockedAddErrors).not.toHaveBeenCalled();
      expect(result.current.loading).toBeFalsy();
    });

    describe('but error happens', () => {
      test('calls addErrors', async () => {
        // Arange
        const mockedErrorMessage = 'mocked-error';
        const mockedError = new Error('mocked-error');
        const expectedErrors = { main: mockedErrorMessage };
        const mockedOnSubmit = jest.fn(() => {
          throw mockedError;
        });
        const mockedProps = {
          defaultValues: mockedDefaultValues,
          attributes: mockedAttributes,
          onDelete: mockedOnDelete,
          onSubmit: mockedOnSubmit,
        };
        const { result } = renderHook(() => useForm(mockedProps));
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedOnDelete).not.toHaveBeenCalledWith();
        expect(mockedOnSubmit).toHaveBeenCalledWith(mockedDefaultValues);
        expect(mockedAddErrors).toHaveBeenCalledWith(expectedErrors);
        expect(result.current.loading).toBeFalsy();
      });
    });
  });
});
