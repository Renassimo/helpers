const MockedAviaInput = jest.fn(
  ({ title, placeholder, label, value, disabled, adornments }) => (
    <div>
      MockedAviaInput - {title} - {placeholder} - {label} - {value} -{' '}
      {disabled && 'disabled'} - {adornments}
    </div>
  )
);

export default MockedAviaInput;
