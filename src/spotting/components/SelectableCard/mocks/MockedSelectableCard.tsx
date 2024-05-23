import { ReactNode } from 'react';

const MockedSelectableCard = jest.fn(
  ({
    children,
    selectable = false,
    selected = false,
    isAnySelected = false,
    toggleSelect,
  }: {
    children: ReactNode;
    selectable?: boolean;
    selected?: boolean;
    isAnySelected?: boolean;
    toggleSelect: () => void;
  }) => (
    <div>
      {children} {selectable ? 'selectable' : 'not selectable'},
      {selected ? 'selected' : 'not selected'},
      {isAnySelected ? 'isAnySelected' : 'not isAnySelected'},
      {!!toggleSelect ? 'toggleSelect passed' : 'toggleSelect not passed'}.
    </div>
  )
);

export default MockedSelectableCard;
