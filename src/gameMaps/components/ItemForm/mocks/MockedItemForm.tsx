const MockedItemForm = jest.fn(({ values, errors }) => (
  <div>
    MockedItemForm - {values?.description} - {values?.collected && 'collected'}{' '}
    - {errors?.description} - {errors?.collected}
  </div>
));

export default MockedItemForm;
