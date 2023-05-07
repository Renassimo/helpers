const MockedNewFirstFlightForm = jest.fn(
  ({ id, disabled }: { id: string; disabled: boolean }) => (
    <div>
      MockedNewFirstFlightForm: id: {id}, {disabled ? 'disabled' : 'enabled'}
    </div>
  )
);

export default MockedNewFirstFlightForm;
