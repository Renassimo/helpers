const MockedImagePaste = jest.fn(({ onPaste }) => {
  return <div>MockedImagePaste {onPaste && 'onPaste'}</div>;
});

export default MockedImagePaste;
