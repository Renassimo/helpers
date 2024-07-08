const MockedColorPicker = jest.fn(({ name, value, label, onChange }) => {
  return (
    <div>
      {name} - {value} - {label} - {onChange && 'onChange'}
    </div>
  );
});

export default MockedColorPicker;
