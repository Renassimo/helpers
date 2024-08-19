const MockedGameForm = jest.fn(({ values, errors, isReady }) => (
  <div>
    MockedGameForm - {values?.title} - {values?.description} -{' '}
    {values?.backgroundColor} - {values?.mapImageUrl} - {errors?.title} -{' '}
    {errors?.description} - {errors?.backgroundColor} - {isReady && 'isReady'}
  </div>
));

export default MockedGameForm;
