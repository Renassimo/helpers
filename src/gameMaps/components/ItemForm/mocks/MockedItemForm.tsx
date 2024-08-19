const MockedItemForm = jest.fn(({ values, errors, isReady }) => (
  <div>
    MockedItemForm - {values?.description} - {values?.collected && 'collected'}{' '}
    - {errors?.description} - {errors?.collected} - {isReady && 'isReady'}
  </div>
));

export default MockedItemForm;
