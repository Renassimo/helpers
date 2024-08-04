const MockedCategoryForm = jest.fn(({ values, errors }) => (
  <div>
    MockedCategoryForm - {values?.title} - {values?.description} -{' '}
    {values?.color} - {values?.itemsAmount} - {errors?.title} -{' '}
    {errors?.description} - {errors?.color} - {errors?.itemsAmount}
  </div>
));

export default MockedCategoryForm;
