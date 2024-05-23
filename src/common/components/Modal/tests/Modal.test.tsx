import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '../Modal';

describe('Modal', () => {
  const mockedOnClose = jest.fn();
  const mockedOnSubmit = jest.fn();

  const mockedProps = {
    onClose: mockedOnClose,
    onSubmit: mockedOnSubmit,
    title: 'Title',
    open: true,
    loading: false,
  };

  describe('when "close" button clicked', () => {
    test('calls onClose', async () => {
      // Arrange
      const { getByLabelText } = render(<Modal {...mockedProps}>Modal</Modal>);
      // Act
      await userEvent.click(getByLabelText('close'));
      // Assert
      expect(mockedOnClose).toHaveBeenCalled();
    });
  });

  describe('when "Save" button clicked', () => {
    test('calls onSubmit', async () => {
      // Arrange
      const { getByText } = render(<Modal {...mockedProps}>Modal</Modal>);
      // Act
      await userEvent.click(getByText('Save'));
      // Assert
      expect(mockedOnSubmit).toHaveBeenCalled();
    });
  });
});
