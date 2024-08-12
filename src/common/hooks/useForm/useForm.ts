import { useCallback, useMemo, useState } from 'react';

import useErrors from '@/common/hooks/useErrors';

import { CommonError } from '@/common/types/errors';

type Value = string | number | boolean | null | undefined;

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const useForm = <A extends Record<string, any>>({
  defaultValues,
  attributes,
  onDelete: handleDelete,
  onSubmit: handleSubmit,
}: {
  defaultValues: A;
  attributes?: A | null;
  onDelete?: () => Promise<void>;
  onSubmit?: (values: A) => Promise<void>;
}): {
  isEditing: boolean;
  values: A;
  setters: { [key: string]: (value: Value) => void };
  loading: boolean;
  errors: Record<string, string>;
  clear: () => void;
  prepareForEdit: () => void;
  addErrors: (properties: Record<string, string>) => void;
  onDelete: () => Promise<void>;
  onSubmit: () => Promise<void>;
} => {
  const isEditing = !!attributes;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(
    Object.entries(defaultValues).reduce(
      (result, [key, defaultValue]) => ({ ...result, [key]: defaultValue }),
      {}
    )
  );

  const { errors, addErrors, cleanErrors } = useErrors();

  const setters = useMemo(
    () =>
      Object.keys(defaultValues).reduce(
        (result, key) => ({
          ...result,
          [`set${capitalizeFirstLetter(key)}`]: (newValue: Value) =>
            setValues((currentValues) => ({
              ...currentValues,
              [key]: newValue,
            })),
        }),
        {}
      ),
    [defaultValues]
  );

  const clear = useCallback(() => {
    setValues(
      Object.entries(defaultValues).reduce(
        (result, [key, defaultValue]) => ({
          ...result,
          [key]: defaultValue,
        }),
        {}
      )
    );
    cleanErrors();
  }, [defaultValues]);

  const prepareForEdit = useCallback(() => {
    if (attributes) {
      setValues(
        Object.keys(defaultValues).reduce(
          (result, key) => ({
            ...result,
            [key]: attributes[key],
          }),
          {}
        )
      );
    }
  }, [defaultValues, attributes]);

  const onDelete = useCallback(async () => {
    if (isEditing) {
      setLoading(true);
      try {
        await handleDelete?.();
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        const main = (error as CommonError).message ?? 'Error happened';
        addErrors({ main });
      }
    }
  }, [isEditing, handleDelete]);

  const onSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await handleSubmit?.(values as A);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      const main = (error as CommonError).message ?? 'Error happened';
      addErrors({ main });
    }
  }, [values, handleSubmit]);

  return {
    isEditing,
    values: values as A,
    setters,
    loading,
    errors,
    clear,
    prepareForEdit,
    addErrors,
    onDelete,
    onSubmit,
  };
};

export default useForm;
