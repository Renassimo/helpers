const MockedColorPicker = jest.fn(({ name, value, label, onChange, error }) => {
  return (
    <div>
      {name} - {value} - {label} - {onChange && 'onChange'} - {error}
    </div>
  );
});

export default MockedColorPicker;
