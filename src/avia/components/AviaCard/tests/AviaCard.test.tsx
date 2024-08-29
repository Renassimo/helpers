import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ActiveCard from '@/common/components/ActiveCard';

import MockedActiveCard from '@/common/components/ActiveCard/mocks';

import AviaCard from '../AviaCard';

jest.mock('@/common/components/ActiveCard');

describe('AviaCard', () => {
  const props = {
    additionalContent: ['content 1', 'content 2'],
    onClick: jest.fn(),
    chosen: true,
    imageUrl: 'image-url',
    imageAlt: 'image-alt',
    title: 'title',
  };

  beforeEach(() => {
    (ActiveCard as unknown as jest.Mock).mockImplementationOnce(
      MockedActiveCard
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<AviaCard {...props} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
