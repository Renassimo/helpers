const mockUseForm = (mocks: Record<string, any>) => {
  const {
    mockedIsEditing,
    mockedValues,
    mockedSetters,
    mockedLoading,
    mockedErrors,
    mockedClear,
    mockedPrepareForEdit,
    mockedAddErrors,
    mockedOnDelete,
    mockedOnSubmit,
  } = mocks ?? {};
  return jest.fn(
    ({ defaultValues, attributes, onDelete, onSubmit, getValidator }) => ({
      isEditing: mockedIsEditing ?? 'mocked-is-editing',
      values: mockedValues ?? attributes ?? defaultValues ?? {},
      setters: mockedSetters ?? {},
      loading: mockedLoading ?? 'mocked-loading',
      errors: mockedErrors ?? {},
      clear: mockedClear ?? jest.fn(),
      prepareForEdit: mockedPrepareForEdit ?? jest.fn(),
      addErrors: mockedAddErrors ?? jest.fn(),
      onDelete: mockedOnDelete ?? onDelete ?? jest.fn(),
      onSubmit:
        mockedOnSubmit ??
        (async () => {
          await getValidator(mockedValues);
          await onSubmit(mockedValues);
        }) ??
        jest.fn(),
    })
  );
};
export default mockUseForm;
