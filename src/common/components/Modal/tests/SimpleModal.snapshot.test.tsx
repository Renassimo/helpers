import renderWithTheme from '@/common/tests/helpers';

import useMediaQuery from '@mui/material/useMediaQuery';

import SimpleModal from '../SimpleModal';

jest.mock('@mui/material/useMediaQuery');

describe('SimpleModal snapshot', () => {
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
      const { baseElement } = renderWithTheme(
        <SimpleModal open loading={false} {...mockedProps}>
          SimpleModal
        </SimpleModal>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockUseMediaQuery).toHaveBeenCalledWith(
        '@media (max-width:899.95px)'
      );
    });

    describe('when maxWidth passed', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(
          <SimpleModal open loading={false} {...mockedProps} maxWidth="md">
            SimpleModal
          </SimpleModal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });

    describe('and is loading', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(
          <SimpleModal open loading {...mockedProps}>
            SimpleModal
          </SimpleModal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });

    describe('and disabled', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(
          <SimpleModal open disabled loading={false} {...mockedProps}>
            SimpleModal
          </SimpleModal>
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
        const { baseElement } = renderWithTheme(
          <SimpleModal open={false} loading={false} {...mockedProps}>
            SimpleModal
          </SimpleModal>
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
      const { baseElement } = renderWithTheme(
        <SimpleModal open loading={false} {...mockedProps}>
          SimpleModal
        </SimpleModal>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockUseMediaQuery).toHaveBeenCalledWith(
        '@media (max-width:899.95px)'
      );
    });

    describe('when maxWidth passed', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(
          <SimpleModal open loading={false} {...mockedProps} maxWidth="xl">
            SimpleModal
          </SimpleModal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });

    describe('and is loading', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(
          <SimpleModal open loading {...mockedProps}>
            SimpleModal
          </SimpleModal>
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(mockUseMediaQuery).toHaveBeenCalledWith(
          '@media (max-width:899.95px)'
        );
      });
    });

    describe('and disabled', () => {
      test('renders successfully', () => {
        // Arrange
        // Act
        const { baseElement } = renderWithTheme(
          <SimpleModal open disabled loading {...mockedProps}>
            SimpleModal
          </SimpleModal>
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
        const { baseElement } = renderWithTheme(
          <SimpleModal open={false} loading={false} {...mockedProps}>
            SimpleModal
          </SimpleModal>
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
