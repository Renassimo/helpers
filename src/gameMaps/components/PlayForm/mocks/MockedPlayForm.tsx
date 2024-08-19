const MockedPlayForm = jest.fn(({ values, errors, isReady }) => (
  <div>
    MockedPlayForm - {values?.title} - {values?.description} - {errors?.title} -{' '}
    {errors?.description} - {isReady && 'isReady'}
  </div>
));

export default MockedPlayForm;
