import userEvent from '@testing-library/user-event';

import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ActiveCard from '../ActiveCard';

describe('ActiveCard', () => {
  const onClick = jest.fn();
  const onClose = jest.fn();
  const imageUrl = 'image-url';
  const imageAlt = 'image-alt';

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = { onClick, onClose };

  const renderActiveCard = (props: {
    onClick: () => void;
    onClose: () => void;
    chosen?: boolean;
    imageUrl?: string;
    imageAlt?: string;
  }) => {
    return renderWithTheme(
      <ActiveCard {...props}>
        <div>Children</div>
      </ActiveCard>
    );
  };

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderActiveCard(defaultProps);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when clicks to action area', () => {
    test('calls onClick', async () => {
      // Arange
      const { getByLabelText } = renderActiveCard(defaultProps);
      // Act
      await userEvent.click(getByLabelText('Action area'));
      // Assert
      expect(onClick).toBeCalled();
    });
  });

  describe('when chosen passed', () => {
    const props = { ...defaultProps, chosen: true };

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderActiveCard(props);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when clicks to close', () => {
      test('calls onClose', async () => {
        // Arange
        const { getByLabelText } = renderActiveCard(props);
        // Act
        await userEvent.click(getByLabelText('Close'));
        // Assert
        expect(onClose).toBeCalled();
      });
    });
  });

  describe('when image passed', () => {
    test('renders successfully', () => {
      // Arange
      const props = { ...defaultProps, imageUrl, imageAlt };
      // Act
      const { baseElement } = renderActiveCard(props);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when chosen passed', () => {
      test('renders successfully', () => {
        // Arange
        const props = { ...defaultProps, imageUrl, imageAlt, chosen: true };
        // Act
        const { baseElement } = renderActiveCard(props);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
