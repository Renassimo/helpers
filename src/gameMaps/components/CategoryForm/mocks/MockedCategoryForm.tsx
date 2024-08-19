const MockedCategoryForm = jest.fn(({ values, errors, isReady }) => (
  <div>
    MockedCategoryForm - {values?.title} - {values?.description} -{' '}
    {values?.color} - {values?.itemsAmount} - {errors?.title} -{' '}
    {errors?.description} - {errors?.color} - {errors?.itemsAmount} -{' '}
    {isReady && 'isReady'}
  </div>
));

export default MockedCategoryForm;
