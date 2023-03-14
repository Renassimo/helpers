import { render } from '@testing-library/react';

import Modal from '../Modal';

import useMediaQuery from '@mui/material/useMediaQuery';

jest.mock('@mui/material/useMediaQuery');

describe('Modal snapshot', () => {
  const mockedProps = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    title: 'Title',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when screen width is wider than "md"', () => {
    const mockUseMediaQuery = jest.fn(() => true);

    beforeEach(() => {
      (useMediaQuery as unknown as jest.Mock).mockImplementationOnce(
        mockUseMediaQuery
      );
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = render(
        <Modal open loading={false} {...mockedProps}>
          Modal
        </Modal>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockUseMediaQuery).toHaveBeenCalledWith(
        '@media (max-width:899.95px)'
      );
    });

    describe('and is loading', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = render(
          <Modal open loading {...mockedProps}>
            Modal
          </Modal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });

    describe('and is closed', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = render(
          <Modal open={false} loading={false} {...mockedProps}>
            Modal
          </Modal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('when screen width is lower than "md"', () => {
    const mockUseMediaQuery = jest.fn(() => false);
    beforeEach(() => {
      (useMediaQuery as unknown as jest.Mock).mockImplementationOnce(
        mockUseMediaQuery
      );
    });

    test('renders successfully', () => {
      // Arrange
      // Act
      const { baseElement } = render(
        <Modal open loading={false} {...mockedProps}>
          Modal
        </Modal>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockUseMediaQuery).toHaveBeenCalledWith(
        '@media (max-width:899.95px)'
      );
    });

    describe('and is loading', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = render(
          <Modal open loading {...mockedProps}>
            Modal
          </Modal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });

    describe('and is closed', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = render(
          <Modal open={false} loading={false} {...mockedProps}>
            Modal
          </Modal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });
  });
});
