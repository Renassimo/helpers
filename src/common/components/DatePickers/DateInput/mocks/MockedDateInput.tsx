const MockedDateInput = jest.fn(
  ({ value, placeholder, label, ariaLabel, originalValue }) => (
    <div>
      MockedDateInput - {value} - {placeholder} - {label} - {ariaLabel} -{' '}
      {originalValue}
    </div>
  )
);

export default MockedDateInput;
