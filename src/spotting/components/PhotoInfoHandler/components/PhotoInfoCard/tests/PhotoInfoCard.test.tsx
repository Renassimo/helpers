import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import SelectableCard from '@/spotting/components/SelectableCard';
import MockedSelectableCard from '@/spotting/components/SelectableCard/mocks/MockedSelectableCard';

import PhotoInfoCard from '../PhotoInfoCard';

jest.mock('@/spotting/components/SelectableCard');

describe('PhotoInfoCard', () => {
  beforeEach(() => {
    (SelectableCard as unknown as jest.Mock).mockImplementation(
      MockedSelectableCard
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const selected = false;
  const name = 'name';
  const preview = 'preview';
  const id = 'id';

  const onPhotoSelected = jest.fn();
  const onOpenZoom = jest.fn();
  const onClick = jest.fn();
  const onRemoveFromFolder = jest.fn();

  const props = {
    selected,
    name,
    preview,
    id,
  };

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoInfoCard {...props} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when card media clicked clicked', () => {
    describe('when onPhotoSelected passed', () => {
      test('calls onPhotoSelected', async () => {
        // Arange
        const { baseElement, getByTitle } = renderWithTheme(
          <PhotoInfoCard {...{ ...props, onPhotoSelected }} />
        );
        // Act
        await userEvent.click(getByTitle(name));
        // Assert
        expect(onPhotoSelected).toBeCalledWith(id);
        expect(onOpenZoom).not.toBeCalled();
        expect(onClick).not.toBeCalled();
        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('when onClick passed', () => {
      test('calls onClick', async () => {
        // Arange
        const { baseElement, getByTitle } = renderWithTheme(
          <PhotoInfoCard {...{ ...props, onClick }} />
        );
        // Act
        await userEvent.click(getByTitle(name));
        // Assert
        expect(onPhotoSelected).not.toBeCalled();
        expect(onOpenZoom).not.toBeCalled();
        expect(onClick).toBeCalled();
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('when zoom button clicked clicked', () => {
    test('calls onOpenZoom', async () => {
      // Arange
      const { baseElement, getByLabelText } = renderWithTheme(
        <PhotoInfoCard {...{ ...props, onOpenZoom }} />
      );
      // Act
      await userEvent.click(getByLabelText('zoom'));
      // Assert
      expect(onPhotoSelected).not.toBeCalled();
      expect(onOpenZoom).toBeCalledWith(id);
      expect(onClick).not.toBeCalled();
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when remove button clicked clicked', () => {
    test('calls onRemoveFromFolder', async () => {
      // Arange
      const { baseElement, getByLabelText } = renderWithTheme(
        <PhotoInfoCard {...{ ...props, onRemoveFromFolder }} />
      );
      // Act
      await userEvent.click(getByLabelText('remove'));
      // Assert
      expect(onPhotoSelected).not.toBeCalled();
      expect(onOpenZoom).not.toBeCalled();
      expect(onClick).not.toBeCalled();
      expect(onRemoveFromFolder).toBeCalledWith(id);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
