import { useCallback, useMemo, useState } from 'react';

import useErrors from '@/common/hooks/useErrors';

import { validate } from '@/common/utils/validators';

import { CommonError } from '@/common/types/errors';

import Validator from '@/common/utils/validators/validator';

type Value = string | number | boolean | null | undefined;

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const useForm = <A extends Record<string, any>, V extends Validator>({
  defaultValues,
  attributes,
  onDelete: handleDelete,
  onSubmit: handleSubmit,
  getValidator,
}: {
  defaultValues: A;
  attributes?: A | null;
  onDelete?: () => Promise<void>;
  onSubmit?: (values: A) => Promise<void>;
  getValidator?: (values: A) => V;
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

  const validates = useCallback(async () => {
    if (!getValidator) return;
    await validate(getValidator(values as A), addErrors);
  }, [getValidator, values]);

  const onSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await validates();
      await handleSubmit?.(values as A);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      const main = (error as CommonError).message ?? 'Error happened';
      addErrors({ main });
    }
  }, [values, handleSubmit, validates]);

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
