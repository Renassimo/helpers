const MockedClearableInput = jest.fn(
  ({ value, label, type, originalValue }) => {
    return (
      <div>
        MockedClearableInput - {value} - {label} - {type} - {originalValue}
      </div>
    );
  }
);

export default MockedClearableInput;
