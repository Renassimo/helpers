const MockedFreeAutoComplete = jest.fn(
  ({ options, value, label, originalValue }) => (
    <div>
      MockedFreeAutoComplete - {value} - {label} - {originalValue} -{' '}
      {options.map((option: string) => `${option} -`)}
    </div>
  )
);

export default MockedFreeAutoComplete;
