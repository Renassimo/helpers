const MockedGameForm = jest.fn(({ values, errors }) => (
  <div>
    MockedGameForm - {values?.title} - {values?.description} -{' '}
    {values?.backgroundColor} - {values?.mapImageUrl} - {errors?.title} -{' '}
    {errors?.description} - {errors?.backgroundColor}
  </div>
));

export default MockedGameForm;
