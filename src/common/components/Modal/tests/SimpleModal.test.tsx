import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SimpleModal from '../SimpleModal';

describe('SimpleModal', () => {
  const mockedOnClose = jest.fn();
  const mockedOnSubmit = jest.fn();

  const mockedProps = {
    onClose: mockedOnClose,
    onSubmit: mockedOnSubmit,
    title: 'Title',
    open: true,
    loading: false,
    fullWidth: false,
  };

  describe('when "close" button clicked', () => {
    test('calls onClose', async () => {
      // Arrange
      const { getByLabelText } = render(
        <SimpleModal {...mockedProps}>SimpleModal</SimpleModal>
      );
      // Act
      await userEvent.click(getByLabelText('close'));
      // Assert
      expect(mockedOnClose).toHaveBeenCalled();
    });
  });

  describe('when "Save" button clicked', () => {
    test('calls onSubmit', async () => {
      // Arrange
      const { getByText } = render(
        <SimpleModal {...mockedProps}>SimpleModal</SimpleModal>
      );
      // Act
      await userEvent.click(getByText('Save'));
      // Assert
      expect(mockedOnSubmit).toHaveBeenCalled();
    });
  });
});
