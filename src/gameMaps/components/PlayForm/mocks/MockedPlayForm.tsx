const MockedPlayForm = jest.fn(({ values, errors }) => (
  <div>
    MockedPlayForm - {values?.title} - {values?.description} - {errors?.title} -{' '}
    {errors?.description}
  </div>
));

export default MockedPlayForm;
